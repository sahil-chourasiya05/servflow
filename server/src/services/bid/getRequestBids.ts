import { Types } from 'mongoose'
import { Bid } from '@/models/Bid.js'
import { ServiceRequest } from '@/models/ServiceRequest.js'
import { ApiError } from '@/utils/ApiError.js'

export const getRequestBids = async (requestId: string, clientId: string) => {
    if (!Types.ObjectId.isValid(requestId)) {
        throw ApiError.badRequest('Invalid request id')
    }

    const request = await ServiceRequest.findOne({ _id: requestId, client: clientId })
    if (!request) throw ApiError.notFound('Request not found')

    return Bid.find({ request: requestId })
        .populate('provider', 'name role category travelFee')
        .sort({ price: 1 })
}