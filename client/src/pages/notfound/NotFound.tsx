import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold'>404 - Page not found</h1>
            <Link to='/' className='mt-4 inline-block text-blue-600 underline'>
                Go home
            </Link>
        </div>
    )
}