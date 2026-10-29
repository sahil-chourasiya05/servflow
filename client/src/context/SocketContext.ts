import { createContext } from 'react'
import type { AppSocket } from '@/socket/socket'

export interface SocketContextValue {
    socket: AppSocket
    isConnected: boolean
}

export const SocketContext = createContext<SocketContextValue | null>(null)