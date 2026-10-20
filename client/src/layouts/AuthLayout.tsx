import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow'>
                <h1 className='mb-6 text-center text-2xl font-bold'>ServFlow</h1>
                <Outlet />
            </div>
        </div>
    )
}