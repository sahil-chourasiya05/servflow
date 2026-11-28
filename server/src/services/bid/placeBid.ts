import { Types } from 'mongoose'
import { Bid } from '@/models/Bid.js'
import { ServiceRequest } from '@/models/ServiceRequest.js'
import { ApiError } from '@/utils/ApiError.js'
import { emitNewBid } from '@/socket/bidSocket.js'

interface PlaceBidInput {
    requestId: string
    providerId: string
    price: number
    etaMinutes: number
    note?: string
}

export const placeBid = async ({ requestId, providerId, price, etaMinutes, note }: PlaceBidInput) => {
    if (!Types.ObjectId.isValid(requestId)) {
        throw ApiError.badRequest('Invalid request id')
    }

    const request = await ServiceRequest.findById(requestId)
    if (!request) throw ApiError.notFound('Request not found')

    if (request.status !== 'open') {
        throw ApiError.badRequest('This request is no longer open')
    }

    const isTarget = request.targetProviders?.some((id) => id.toString() === providerId)
    if (!isTarget) throw ApiError.forbidden('This request was not sent to you')

    if (await Bid.exists({ request: requestId, provider: providerId })) {
        throw ApiError.conflict('You have already placed a bid on this request')
    }

    const bid = await Bid.create({ request: requestId, provider: providerId, price, etaMinutes, note })

    emitNewBid(request.client.toString(), requestId, bid._id.toString())

    return bid
}