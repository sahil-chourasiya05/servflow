import { getIO } from '@/config/socket.js'
import { SOCKET_EVENTS } from '@/socket/events.js'
import type { IServiceRequest, NewRequestPayload } from '@/types/index.js'

export const emitNewRequest = (request: IServiceRequest): void => {
    const io = getIO()

    const payload: NewRequestPayload = {
        requestId: request._id.toString(),
        category: request.category,
        description: request.description,
        photoUrl: request.photoUrl,
        mode: request.mode,
        location: request.location,
        createdAt: request.createdAt,
    }

    for (const providerId of request.targetProviders ?? []) {
        io.to(providerId.toString()).emit(SOCKET_EVENTS.NEW_REQUEST, payload)
    }
}