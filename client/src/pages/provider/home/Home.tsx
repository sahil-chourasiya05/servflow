import { AvailabilityToggle, RequestCard } from '@/components/providerHome'
import { useAuth, useIncomingRequests, useSocket } from '@/hooks'
import { setProviderOnlineStatus } from '@/services/userService'

export function Home() {
    const { user, refreshUser } = useAuth()
    const { isConnected } = useSocket()
    const requests = useIncomingRequests()

    if (user?.role !== 'provider') return null

    const handleToggle = async (next: boolean) => {
        await setProviderOnlineStatus(next)
        await refreshUser()
    }

    return (
        <div className='mx-auto flex max-w-2xl flex-col gap-4'>
            <AvailabilityToggle isOnline={user.isOnline} onToggle={handleToggle} />

            <p className='text-xs text-gray-500'>
                Live updates: {isConnected ? 'connected' : 'disconnected'}
            </p>

            <h2 className='text-lg font-semibold'>Incoming requests</h2>

            {requests.length === 0 ? (
                <p className='text-sm text-gray-500'>
                    No requests yet. Stay online to receive new ones.
                </p>
            ) : (
                requests.map((r) => <RequestCard key={r.requestId} request={r} />)
            )}
        </div>
    )
}