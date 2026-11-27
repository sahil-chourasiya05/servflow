import type { Server } from 'socket.io'
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
    [SOCKET_EVENTS.NEW_BID]: (payload: BidEventPayload) => void
    [SOCKET_EVENTS.BID_ACCEPTED]: (payload: BidEventPayload) => void
    [SOCKET_EVENTS.BID_REJECTED]: (payload: BidRejectedPayload) => void
}

export interface ClientToServerEvents { }

export interface InterServerEvents { }

export interface SocketData {
    user: {
        id: string
        role: UserRole
    }
}

export type AppSocketServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>

export interface BidEventPayload {
    requestId: string
    bidId: string
}

export interface BidRejectedPayload {
    requestId: string
}