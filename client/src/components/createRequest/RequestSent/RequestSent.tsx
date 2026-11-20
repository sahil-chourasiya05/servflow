import { Link } from 'react-router-dom'
import { getCategoryLabel } from '@/constants/categories'
import { CLIENT_HOME_PATH } from '@/constants/routes'
import type { ServiceRequest } from '@/types/request.types'

export function RequestSent({ request }: { request: ServiceRequest }) {
    const count = request.targetProviders.length
    const audience = request.mode === 'direct' ? 'selected' : 'nearby'

    return (
        <div className='rounded-xl bg-white p-6 text-center shadow'>
            <h2 className='text-lg font-semibold'>Request sent</h2>
            <p className='mt-2 text-sm text-gray-600'>
                Your {getCategoryLabel(request.category).toLowerCase()} request was sent to {count}{' '}
                {audience} {count === 1 ? 'provider' : 'providers'}.
            </p>
            <Link
                to={CLIENT_HOME_PATH}
                className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
            >
                Back to home
            </Link>
        </div>
    )
}