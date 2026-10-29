import { createContext } from 'react'
import type { LoginInput, RegisterInput, User } from '@/types/auth.types'

export interface AuthContextValue {
    user: User | null
    isLoading: boolean
    login: (input: LoginInput) => Promise<void>
    register: (input: RegisterInput) => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)