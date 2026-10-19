import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getHomePath } from '@/utils/roleHome'

export function ClientRoute() {
    const { user } = useAuth()

    if (user?.role !== 'client') {
        return <Navigate to={user ? getHomePath(user.role) : '/login'} replace />
    }

    return <Outlet />
}