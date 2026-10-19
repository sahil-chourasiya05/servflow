import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { FullPageLoader } from '@/components/common/loader/FullPageLoader'

export function PrivateRoute() {
    const { user, isLoading } = useAuth()

    if (isLoading) return <FullPageLoader />
    if (!user) return <Navigate to='/login' replace />

    return <Outlet />
}