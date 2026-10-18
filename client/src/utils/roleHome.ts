import type { UserRole } from '@/types/auth.types'

export const getHomePath = (role: UserRole): string =>
    role === 'provider' ? '/provider' : '/client'