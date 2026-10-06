import { Provider } from '@/models/Provider.js'
import { calculateDistanceKm } from '@/utils/distance.js'

interface FindNearbyProvidersInput {
    category: string
    longitude: number
    latitude: number
    radiusKm?: number
}

export const findNearbyProviders = async ({
    category,
    longitude,
    latitude,
    radiusKm = 5,
}: FindNearbyProvidersInput) => {
    const providers = await Provider.find({
        category,
        isOnline: true,
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: radiusKm * 1000,
            },
        },
    })

    return providers.map((provider) => ({
        provider,
        distanceKm: calculateDistanceKm(
            { latitude, longitude },
            {
                latitude: provider.location.coordinates[1],
                longitude: provider.location.coordinates[0],
            }
        ),
    }))
}