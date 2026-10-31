import type { NewRequestPayload } from '@/types/socket.types'

export function RequestCard({ request }: { request: NewRequestPayload }) {
    return (
        <div className='rounded bg-white p-4 shadow'>
            <div className='flex items-center justify-between'>
                <span className='font-medium capitalize'>{request.category.replaceAll('_', ' ')}</span>
                <span className='text-xs text-gray-500'>
                    {new Date(request.createdAt).toLocaleTimeString()}
                </span>
            </div>
            <p className='mt-2 text-sm text-gray-700'>{request.description}</p>
            <span className='mt-3 inline-block rounded bg-blue-50 px-2 py-1 text-xs text-blue-700'>
                {request.mode === 'direct' ? 'Sent to you directly' : 'Nearby request'}
            </span>
        </div>
    )
}