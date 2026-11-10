import { Provider } from '@/models/Provider.js'
import { calculateDistanceKm } from '@/utils/distance.js'

const MAX_RESULTS = 50

interface FindNearbyProvidersInput {
    category: string
    longitude: number
    latitude: number
    radiusKm?: number
}

export interface NearbyProvider {
    id: string
    name: string
    category: string
    travelFee: number
    distanceKm: number
}

export const findNearbyProviders = async ({
    category,
    longitude,
    latitude,
    radiusKm = 5,
}: FindNearbyProvidersInput): Promise<NearbyProvider[]> => {
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
        .select('name category travelFee location')
        .limit(MAX_RESULTS)

    return providers.map((provider) => ({
        id: provider._id.toString(),
        name: provider.name,
        category: provider.category,
        travelFee: provider.travelFee,
        distanceKm:
            Math.round(
                calculateDistanceKm(
                    { latitude, longitude },
                    {
                        latitude: provider.location.coordinates[1],
                        longitude: provider.location.coordinates[0],
                    }
                ) * 10
            ) / 10,
    }))
}