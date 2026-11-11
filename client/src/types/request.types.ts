import type { GeoPoint } from '@/types/auth.types'
import type { ServiceCategory } from '@/constants/categories'

export type RequestMode = 'direct' | 'broadcast'
export type RequestStatus = 'open' | 'closed' | 'expired'

interface CreateRequestBase {
    category: ServiceCategory
    description: string
    longitude: number
    latitude: number
}

export interface CreateBroadcastRequestInput extends CreateRequestBase {
    mode: 'broadcast'
    radiusKm: number
}

export interface CreateDirectRequestInput extends CreateRequestBase {
    mode: 'direct'
    targetProviders: string[]
}

export type CreateRequestInput = CreateBroadcastRequestInput | CreateDirectRequestInput

export interface ServiceRequest {
    _id: string
    client: string
    category: ServiceCategory
    description: string
    photoUrl?: string
    mode: RequestMode
    targetProviders: string[]
    location: GeoPoint
    status: RequestStatus
    createdAt: string
    updatedAt: string
}