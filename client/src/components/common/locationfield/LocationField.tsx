import type { GeoPoint } from '@/types/auth.types'

interface LocationFieldProps {
    label: string
    location: GeoPoint | null
    isLoading: boolean
    error?: string
    onDetect: () => void
}

export function LocationField({ label, location, isLoading, error, onDetect }: LocationFieldProps) {
    return (
        <div className='flex flex-col gap-1'>
            <span className='text-sm font-medium text-gray-700'>{label}</span>
            <div className='flex items-center gap-3'>
                <button
                    type='button'
                    onClick={onDetect}
                    disabled={isLoading}
                    className='rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-60'
                >
                    {isLoading ? 'Detecting...' : location ? 'Detect again' : 'Detect my location'}
                </button>
                {location && (
                    <span className='text-xs text-green-700'>
                        Detected ({location.coordinates[1].toFixed(4)}, {location.coordinates[0].toFixed(4)})
                    </span>
                )}
            </div>
            {error && <p className='text-xs text-red-600'>{error}</p>}
        </div>
    )
}