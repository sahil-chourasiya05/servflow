import { Button } from '@/components/ui'
import type { NearbyProvider } from '@/types/provider.types'

interface ProviderPickerProps {
    providers: NearbyProvider[]
    selectedIds: string[]
    isLoading: boolean
    error: string
    hasLocation: boolean
    radiusKm: number
    onToggle: (providerId: string) => void
    onRetry: () => void
}

export function ProviderPicker({
    providers,
    selectedIds,
    isLoading,
    error,
    hasLocation,
    radiusKm,
    onToggle,
    onRetry,
}: ProviderPickerProps) {
    if (!hasLocation) {
        return (
            <p className='rounded bg-gray-50 px-3 py-2 text-sm text-gray-500'>
                Detect your location to see providers near you.
            </p>
        )
    }

    if (isLoading) {
        return <p className='px-3 py-2 text-sm text-gray-500'>Finding providers near you...</p>
    }

    if (error) {
        return (
            <div className='flex flex-col items-start gap-2 rounded bg-red-50 px-3 py-2'>
                <p role='alert' className='text-sm text-red-700'>
                    {error}
                </p>
                <Button type='button' onClick={onRetry}>
                    Try again
                </Button>
            </div>
        )
    }

    if (providers.length === 0) {
        return (
            <p className='rounded bg-gray-50 px-3 py-2 text-sm text-gray-500'>
                No online providers found within {radiusKm} km. Try a larger radius.
            </p>
        )
    }

    return (
        <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium text-gray-700'>
                Providers near you ({selectedIds.length} selected)
            </p>
            <ul className='flex flex-col gap-2'>
                {providers.map((provider) => {
                    const selected = selectedIds.includes(provider.id)

                    return (
                        <li key={provider.id}>
                            <label
                                className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 ${
                                    selected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type='checkbox'
                                    checked={selected}
                                    onChange={() => onToggle(provider.id)}
                                />
                                <span className='flex-1 text-sm font-medium'>{provider.name}</span>
                                <span className='text-xs text-gray-500'>
                                    {provider.distanceKm} km away · ₹{provider.travelFee}
                                </span>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}