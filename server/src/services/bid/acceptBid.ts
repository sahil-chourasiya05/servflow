import mongoose, { Types } from 'mongoose'
import { Bid } from '@/models/Bid.js'
import { ServiceRequest } from '@/models/ServiceRequest.js'
import { ApiError } from '@/utils/ApiError.js'
import type { IBid } from '@/types/index.js'
import { emitBidAccepted, emitBidRejected } from '@/socket/bidSocket.js'

interface AcceptBidResult {
    bid: IBid
    rejectedProviderIds: string[]
}

export const acceptBid = async (bidId: string, clientId: string): Promise<AcceptBidResult> => {
    if (!Types.ObjectId.isValid(bidId)) {
        throw ApiError.badRequest('Invalid bid id')
    }

    const bid = await Bid.findById(bidId)
    if (!bid) throw ApiError.notFound('Bid not found')

    const request = await ServiceRequest.findOne({ _id: bid.request, client: clientId })
    if (!request) throw ApiError.notFound('Bid not found')

    if (request.status !== 'open') throw ApiError.badRequest('This request is already closed')
    if (bid.status !== 'pending') throw ApiError.badRequest('This bid is no longer available')

    const session = await mongoose.startSession()

    try {
        let result: AcceptBidResult | undefined

        await session.withTransaction(async () => {
            const closed = await ServiceRequest.findOneAndUpdate(
                { _id: request._id, status: 'open' },
                { status: 'closed' },
                { session }
            )
            if (!closed) throw ApiError.conflict('This request was just closed')

            const accepted = await Bid.findOneAndUpdate(
                { _id: bid._id, status: 'pending' },
                { status: 'accepted' },
                { new: true, session }
            )
            if (!accepted) throw ApiError.conflict('This bid is no longer available')

            const others = await Bid.find({
                request: request._id,
                _id: { $ne: bid._id },
                status: 'pending',
            })
                .select('provider')
                .session(session)

            await Bid.updateMany(
                { _id: { $in: others.map((other) => other._id) } },
                { status: 'rejected' },
                { session }
            )

            result = {
                bid: accepted,
                rejectedProviderIds: others.map((other) => other.provider.toString()),
            }
        })

        if (!result) throw ApiError.internal('Could not accept the bid')
        emitBidAccepted(result.bid.provider.toString(), request._id.toString(), result.bid._id.toString())
        emitBidRejected(result.rejectedProviderIds, request._id.toString())
        return result
    } finally {
        await session.endSession()
    }
}