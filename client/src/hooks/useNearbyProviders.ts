import { useCallback, useEffect, useState } from 'react'
import { getNearbyProviders } from '@/services/userService'
import type { NearbyProvider, NearbyProvidersParams } from '@/types/provider.types'

interface FetchResult {
    key: string
    providers: NearbyProvider[]
    error: string
}

export function useNearbyProviders(params: NearbyProvidersParams | null) {
    const category = params?.category
    const longitude = params?.longitude
    const latitude = params?.latitude
    const radiusKm = params?.radiusKm

    const [reloadToken, setReloadToken] = useState(0)
    const [result, setResult] = useState<FetchResult | null>(null)

    const key =
        category === undefined ||
            longitude === undefined ||
            latitude === undefined ||
            radiusKm === undefined
            ? null
            : `${category}|${longitude}|${latitude}|${radiusKm}|${reloadToken}`

    useEffect(() => {
        if (
            key === null ||
            category === undefined ||
            longitude === undefined ||
            latitude === undefined ||
            radiusKm === undefined
        ) {
            return
        }

        let cancelled = false

        getNearbyProviders({ category, longitude, latitude, radiusKm })
            .then((providers) => {
                if (!cancelled) setResult({ key, providers, error: '' })
            })
            .catch((err) => {
                if (!cancelled) {
                    setResult({
                        key,
                        providers: [],
                        error: err instanceof Error ? err.message : 'Could not load providers',
                    })
                }
            })

        return () => {
            cancelled = true
        }
    }, [key, category, longitude, latitude, radiusKm])

    const reload = useCallback(() => setReloadToken((token) => token + 1), [])

    const isCurrent = key !== null && result?.key === key

    return {
        providers: isCurrent ? result.providers : [],
        isLoading: key !== null && !isCurrent,
        error: isCurrent ? result.error : '',
        reload,
    }
}