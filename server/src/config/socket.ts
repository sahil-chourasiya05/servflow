import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import { env } from '@/config/env.js'
import { registerSocketHandlers } from '@/socket/socketHandler.js'
import type {
    AppSocketServer,
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from '@/types/index.js'

let io: AppSocketServer | undefined

export const initSocket = (httpServer: HttpServer): AppSocketServer => {
    io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >(httpServer, {
        cors: {
            origin: env.CLIENT_ORIGIN,
            credentials: true,
        },
    })

    registerSocketHandlers(io)

    return io
}

export const getIO = (): AppSocketServer => {
    if (!io) {
        throw new Error('Socket.io is not initialized. Call initSocket first.')
    }
    return io
}