import { SOCKET_EVENTS } from '@/socket/events'
import type { GeoPoint } from '@/types/auth.types'

export interface NewRequestPayload {
    requestId: string
    category: string
    description: string
    photoUrl?: string
    mode: 'direct' | 'broadcast'
    location: GeoPoint
    createdAt: string
}

export interface ServerToClientEvents {
    [SOCKET_EVENTS.NEW_REQUEST]: (payload: NewRequestPayload) => void
}

export type ClientToServerEvents = Record<never, never>