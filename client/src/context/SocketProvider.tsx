import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { SocketContext, type SocketContextValue } from '@/context/SocketContext'
import { useAuth } from '@/hooks/useAuth'
import { socket } from '@/socket/socket'

export function SocketProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()
    const userId = user?._id
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (!userId) return

        const onConnect = () => setIsConnected(true)
        const onDisconnect = () => setIsConnected(false)
        const onError = (err: Error) => console.error('Socket error:', err.message)

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('connect_error', onError)
        socket.connect()

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('connect_error', onError)
            socket.disconnect()
        }
    }, [userId])

    const value = useMemo<SocketContextValue>(() => ({ socket, isConnected }), [isConnected])

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}