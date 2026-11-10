import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { ApiError } from '@/utils/ApiError.js'
import { setOnlineStatus } from '@/services/provider/setOnlineStatus.js'
import { findNearbyProviders } from '@/services/matchingService.js'
import {
    assertValidCategory,
    assertValidCoordinates,
    assertValidRadius,
} from '@/utils/validators.js'

const DEFAULT_RADIUS_KM = 5

const parseNumber = (value: unknown): number =>
    typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN

export const updateOnlineStatus = asyncHandler(async (req: Request, res: Response) => {
    const { isOnline } = req.body

    if (typeof isOnline !== 'boolean') {
        throw ApiError.badRequest('isOnline must be true or false')
    }

    const provider = await setOnlineStatus(req.user!.id, isOnline)

    res.status(200).json(
        new ApiResponse(200, isOnline ? 'You are now online' : 'You are now offline', {
            isOnline: provider.isOnline,
        })
    )
})

export const getNearbyProviders = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.query
    const longitude = parseNumber(req.query.longitude)
    const latitude = parseNumber(req.query.latitude)
    const radiusKm =
        req.query.radiusKm === undefined ? DEFAULT_RADIUS_KM : parseNumber(req.query.radiusKm)

    assertValidCategory(category)
    assertValidCoordinates(longitude, latitude)
    assertValidRadius(radiusKm)

    const providers = await findNearbyProviders({ category, longitude, latitude, radiusKm })

    res.status(200).json(
        new ApiResponse(200, 'Nearby providers fetched successfully', providers)
    )
})