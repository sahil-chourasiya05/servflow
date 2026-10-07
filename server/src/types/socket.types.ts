import { SOCKET_EVENTS } from '@/socket/events.js'
import { UserRole } from './models.types.js'

export interface NewRequestPayload {
    requestId: string
    category: string
    description: string
    photoUrl?: string
    mode: 'direct' | 'broadcast'
    location: {
        type: 'Point'
        coordinates: [number, number]
    }
    createdAt: Date
}

export interface ServerToClientEvents {
    [SOCKET_EVENTS.NEW_REQUEST]: (payload: NewRequestPayload) => void
}

export interface ClientToServerEvents { }

export interface InterServerEvents { }

export interface SocketData {
    user: {
        id: string
        role: UserRole
    }
}