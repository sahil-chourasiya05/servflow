import { getIO } from '@/config/socket.js'
import { SOCKET_EVENTS } from '@/socket/events.js'

export const emitNewBid = (clientId: string, requestId: string, bidId: string): void => {
    getIO().to(clientId).emit(SOCKET_EVENTS.NEW_BID, { requestId, bidId })
}

export const emitBidAccepted = (providerId: string, requestId: string, bidId: string): void => {
    getIO().to(providerId).emit(SOCKET_EVENTS.BID_ACCEPTED, { requestId, bidId })
}

export const emitBidRejected = (providerIds: string[], requestId: string): void => {
    const io = getIO()
    providerIds.forEach((providerId) => {
        io.to(providerId).emit(SOCKET_EVENTS.BID_REJECTED, { requestId })
    })
}