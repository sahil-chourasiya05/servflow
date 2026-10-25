import { useCallback, useState } from 'react'
import type { GeoPoint } from '@/types/auth.types'

export function useGeolocation() {
    const [location, setLocation] = useState<GeoPoint | null>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const detect = useCallback(() => {
        if (!('geolocation' in navigator)) {
            setError('Location is not supported in this browser')
            return
        }

        setIsLoading(true)
        setError('')

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    type: 'Point',
                    coordinates: [pos.coords.longitude, pos.coords.latitude],
                })
                setIsLoading(false)
            },
            (err) => {
                setError(
                    err.code === err.PERMISSION_DENIED
                        ? 'Location permission denied. Allow it in your browser settings.'
                        : 'Could not detect your location'
                )
                setIsLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }, [])

    return { location, error, isLoading, detect }
}