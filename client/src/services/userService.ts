import api from '@/services/api'
import type { ApiResponse } from '@/types/auth.types'
import type { NearbyProvider, NearbyProvidersParams } from '@/types/provider.types'

export const setProviderOnlineStatus = async (isOnline: boolean): Promise<boolean> => {
    const res = await api.patch<ApiResponse<{ isOnline: boolean }>>('/providers/me/online', {
        isOnline,
    })
    return res.data.data.isOnline
}

export const getNearbyProviders = async (
    params: NearbyProvidersParams
): Promise<NearbyProvider[]> => {
    const res = await api.get<ApiResponse<NearbyProvider[]>>('/providers/nearby', { params })
    return res.data.data
}