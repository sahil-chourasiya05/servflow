import type { ServiceCategory } from '@/constants/categories'

export interface NearbyProvidersParams {
    category: ServiceCategory
    longitude: number
    latitude: number
    radiusKm: number
}

export interface NearbyProvider {
    id: string
    name: string
    category: ServiceCategory
    travelFee: number
    distanceKm: number
}