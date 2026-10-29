import api from '@/services/api'
import type { ApiResponse } from '@/types/auth.types'

export const setProviderOnlineStatus = async (isOnline: boolean): Promise<boolean> => {
    const res = await api.patch<ApiResponse<{ isOnline: boolean }>>('/providers/me/online', {
        isOnline,
    })
    return res.data.data.isOnline
}