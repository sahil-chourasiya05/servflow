import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { FullPageLoader } from '@/components/common/loader/FullPageLoader'
import { getHomePath } from '@/utils/roleHome'

export function PublicRoute() {
    const { user, isLoading } = useAuth()

    if (isLoading) return <FullPageLoader />
    if (user) return <Navigate to={getHomePath(user.role)} replace />

    return <Outlet />
}