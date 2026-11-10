import { Types } from 'mongoose'
import { Provider } from '@/models/Provider.js'
import { ServiceRequest } from '@/models/ServiceRequest.js'
import { findNearbyProviders } from '@/services/matchingService.js'
import { emitNewRequest } from '@/socket/requestSocket.js'
import { ApiError } from '@/utils/ApiError.js'
import {
    assertValidCategory,
    assertValidCoordinates,
    assertValidRadius,
} from '@/utils/validators.js'

const MIN_DESCRIPTION_LENGTH = 10

interface CreateRequestInput {
    clientId: string
    category: string
    description: string
    mode: 'direct' | 'broadcast'
    targetProviders?: string[]
    longitude: number
    latitude: number
    radiusKm?: number
}

const resolveDirectProviders = async (
    targetProviders: unknown,
    category: string
): Promise<Types.ObjectId[]> => {
    if (!Array.isArray(targetProviders) || targetProviders.length === 0) {
        throw ApiError.badRequest('At least one provider must be selected for direct requests')
    }

    if (!targetProviders.every((id) => typeof id === 'string' && Types.ObjectId.isValid(id))) {
        throw ApiError.badRequest('Invalid provider selected')
    }

    const uniqueIds = [...new Set(targetProviders.map((id) => new Types.ObjectId(id).toString()))]

    const validProviders = await Provider.find({
        _id: { $in: uniqueIds },
        category,
        isOnline: true,
    }).select('_id')

    if (validProviders.length !== uniqueIds.length) {
        throw ApiError.badRequest('One or more selected providers are not available for this service')
    }

    return validProviders.map((provider) => provider._id)
}

const resolveBroadcastProviders = async (input: {
    category: string
    longitude: number
    latitude: number
    radiusKm: number
}): Promise<Types.ObjectId[]> => {
    assertValidRadius(input.radiusKm)

    const nearby = await findNearbyProviders(input)

    if (nearby.length === 0) {
        throw ApiError.notFound('No providers found nearby for this category')
    }

    return nearby.map((item) => new Types.ObjectId(item.id))
}

export const createServiceRequest = async (input: CreateRequestInput) => {
    const {
        clientId,
        category,
        description,
        mode,
        targetProviders,
        longitude,
        latitude,
        radiusKm = 5,
    } = input

    if (mode !== 'direct' && mode !== 'broadcast') {
        throw ApiError.badRequest('Invalid request mode')
    }
    assertValidCategory(category)
    assertValidCoordinates(longitude, latitude)
    if (typeof description !== 'string' || description.trim().length < MIN_DESCRIPTION_LENGTH) {
        throw ApiError.badRequest(
            `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`
        )
    }

    const finalTargetProviders =
        mode === 'direct'
            ? await resolveDirectProviders(targetProviders, category)
            : await resolveBroadcastProviders({ category, longitude, latitude, radiusKm })

    const request = await ServiceRequest.create({
        client: clientId,
        category,
        description: description.trim(),
        mode,
        targetProviders: finalTargetProviders,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
    })

    emitNewRequest(request)

    return request
}