import { isServiceCategory } from '@/constants/categories.js'
import { ApiError } from '@/utils/ApiError.js'

export const assertValidCategory = (category: unknown): void => {
    if (!isServiceCategory(category)) {
        throw ApiError.badRequest('Invalid category')
    }
}

export const assertValidCoordinates = (longitude: unknown, latitude: unknown): void => {
    const isValidLongitude =
        typeof longitude === 'number' &&
        Number.isFinite(longitude) &&
        longitude >= -180 &&
        longitude <= 180

    const isValidLatitude =
        typeof latitude === 'number' &&
        Number.isFinite(latitude) &&
        latitude >= -90 &&
        latitude <= 90

    if (!isValidLongitude || !isValidLatitude) {
        throw ApiError.badRequest('Invalid location')
    }
}

export const assertValidRadius = (radiusKm: unknown): void => {
    if (
        typeof radiusKm !== 'number' ||
        !Number.isFinite(radiusKm) ||
        radiusKm < 1 ||
        radiusKm > 50
    ) {
        throw ApiError.badRequest('Radius must be between 1 and 50 km')
    }
}