import { parse } from 'cookie'
import { verifyToken } from '@/utils/jwt.js'
import { COOKIE_NAME } from '@/utils/setAuthCookie.js'
import type { AppSocketServer } from '@/types/index.js'

export const registerSocketHandlers = (io: AppSocketServer): void => {
    io.use((socket, next) => {
        const cookies = parse(socket.handshake.headers.cookie ?? '')
        const token = cookies[COOKIE_NAME] ?? socket.handshake.auth?.token

        if (!token) {
            return next(new Error('Authentication token missing'))
        }

        try {
            socket.data.user = verifyToken(token)
            next()
        } catch {
            next(new Error('Invalid or expired token'))
        }
    })

    io.on('connection', (socket) => {
        const { id, role } = socket.data.user

        socket.join(id)
        console.log(`Socket connected: ${socket.id} (user: ${id}, role: ${role})`)

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`)
        })
    })
}