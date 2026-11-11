import api from '@/services/api'
import type { ApiResponse } from '@/types/auth.types'
import type { CreateRequestInput, ServiceRequest } from '@/types/request.types'

export const createRequest = async (input: CreateRequestInput): Promise<ServiceRequest> => {
    const res = await api.post<ApiResponse<ServiceRequest>>('/requests', input)
    return res.data.data
}