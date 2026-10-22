import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoute, ClientRoute, ProviderRoute, PublicRoute } from '@/routes'
import { AuthLayout, ProviderLayout, ClientLayout } from '@/layouts'
import { Login, Signup } from '@/pages/auth'
import { ClientHome } from '@/pages/client'
import { ProviderHome } from '@/pages/provider'
import { NotFound } from '@/pages/notfound/NotFound'

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />

            <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<ClientRoute />}>
                    <Route path='/client' element={<ClientLayout />}>
                        <Route index element={<ClientHome />} />
                    </Route>
                </Route>

                <Route element={<ProviderRoute />}>
                    <Route path='/provider' element={<ProviderLayout />}>
                        <Route index element={<ProviderHome />} />
                    </Route>
                </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}