import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProviderLayout() {
    const { user, logout } = useAuth()

    return (
        <div className='min-h-screen bg-gray-50'>
            <header className='flex items-center justify-between bg-white px-6 py-3 shadow'>
                <span className='font-bold'>ServFlow</span>
                <div className='flex items-center gap-4'>
                    <span className='text-sm text-gray-600'>{user?.name}</span>
                    <button
                        onClick={logout}
                        className='rounded bg-gray-900 px-3 py-1 text-sm text-white'
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className='p-6'>
                <Outlet />
            </main>
        </div>
    )
}