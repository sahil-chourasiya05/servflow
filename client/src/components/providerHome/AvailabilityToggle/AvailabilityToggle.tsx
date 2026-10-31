import { useState } from 'react'

interface AvailabilityToggleProps {
    isOnline: boolean
    onToggle: (next: boolean) => Promise<void>
}

export function AvailabilityToggle({ isOnline, onToggle }: AvailabilityToggleProps) {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')

    const handleClick = async () => {
        setIsPending(true)
        setError('')
        try {
            await onToggle(!isOnline)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not update status')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className='rounded bg-white p-4 shadow'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='font-medium'>{isOnline ? 'You are online' : 'You are offline'}</p>
                    <p className='text-sm text-gray-500'>
                        {isOnline ? 'New requests nearby will appear below' : 'Go online to receive requests'}
                    </p>
                </div>
                <button
                    type='button'
                    role='switch'
                    aria-checked={isOnline}
                    onClick={handleClick}
                    disabled={isPending}
                    className={`relative h-7 w-12 rounded-full transition-colors disabled:opacity-60 ${isOnline ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                >
                    <span
                        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform ${isOnline ? 'translate-x-5' : ''
                            }`}
                    />
                </button>
            </div>
            {error && <p className='mt-2 text-xs text-red-600'>{error}</p>}
        </div>
    )
}