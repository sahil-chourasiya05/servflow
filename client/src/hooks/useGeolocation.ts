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
                        ? 'Please turn on device location and allow location access in your browser.'
                        : err.code === err.POSITION_UNAVAILABLE
                            ? 'Your location is unavailable. Please check your device location settings.'
                            : err.code === err.TIMEOUT
                                ? 'Location detection timed out. Please try again.'
                                : 'Could not detect your location'
                )
                setIsLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }, [])

    return { location, error, isLoading, detect }
}