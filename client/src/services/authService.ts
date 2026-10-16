import api from '@/services/api'
import type { ApiResponse, LoginInput, RegisterInput, User } from '@/types/auth.types'

export const register = async (input: RegisterInput): Promise<void> => {
    await api.post<ApiResponse<unknown>>('/auth/register', input)
}

export const login = async (input: LoginInput): Promise<void> => {
    await api.post<ApiResponse<unknown>>('/auth/login', input)
}

export const getMe = async (): Promise<User> => {
    const res = await api.get<ApiResponse<User>>('/auth/me')
    return res.data.data
}

export const logout = async (): Promise<void> => {
    await api.post<ApiResponse<null>>('/auth/logout')
}