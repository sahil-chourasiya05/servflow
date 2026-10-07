import { ServiceRequest } from '@/models/ServiceRequest.js'
import { findNearbyProviders } from '@/services/matchingService.js'
import { ApiError } from '@/utils/ApiError.js'
import { Types } from 'mongoose'

interface CreateRequestInput {
    clientId: string
    category: string
    description: string
    photoUrl?: string
    mode: 'direct' | 'broadcast'
    targetProviders?: string[]
    longitude: number
    latitude: number
    radiusKm?: number
}

export const createServiceRequest = async (input: CreateRequestInput) => {
    const {
        clientId,
        category,
        description,
        photoUrl,
        mode,
        targetProviders,
        longitude,
        latitude,
        radiusKm = 5,
    } = input

    let finalTargetProviders: Types.ObjectId[] = []

    if (mode === 'direct') {
        if (!targetProviders || targetProviders.length === 0) {
            throw ApiError.badRequest('At least one provider must be selected for direct requests')
        }
        finalTargetProviders = targetProviders.map((id) => new Types.ObjectId(id))
    } else {
        const nearby = await findNearbyProviders({ category, longitude, latitude, radiusKm })

        if (nearby.length === 0) {
            throw ApiError.notFound('No providers found nearby for this category')
        }

        finalTargetProviders = nearby.map((r) => r.provider._id as Types.ObjectId)
    }

    const request = await ServiceRequest.create({
        client: clientId,
        category,
        description,
        photoUrl,
        mode,
        targetProviders: finalTargetProviders,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
    })

    return request
}