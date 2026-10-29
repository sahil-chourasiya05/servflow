import { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { SOCKET_EVENTS } from '@/socket/events'
import type { NewRequestPayload } from '@/types/socket.types'

export function useIncomingRequests() {
    const { socket } = useSocket()
    const [requests, setRequests] = useState<NewRequestPayload[]>([])

    useEffect(() => {
        const onNewRequest = (payload: NewRequestPayload) => {
            setRequests((prev) =>
                prev.some((r) => r.requestId === payload.requestId) ? prev : [payload, ...prev]
            )
        }

        socket.on(SOCKET_EVENTS.NEW_REQUEST, onNewRequest)
        return () => {
            socket.off(SOCKET_EVENTS.NEW_REQUEST, onNewRequest)
        }
    }, [socket])

    return requests
}