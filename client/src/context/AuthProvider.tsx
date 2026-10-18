import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from '@/context/AuthContext'
import * as authService from '@/services/authService'
import { ApiRequestError } from '@/services/api'
import type { LoginInput, RegisterInput, User } from '@/types/auth.types'

const isUnauthorized = (err: unknown) =>
    err instanceof ApiRequestError && err.status === 401

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        authService
            .getMe()
            .then((me) => {
                if (!cancelled) setUser(me)
            })
            .catch((err) => {
                if (!isUnauthorized(err)) console.error(err)
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [])

    const login = useCallback(async (input: LoginInput) => {
        await authService.login(input)
        setUser(await authService.getMe())
    }, [])

    const register = useCallback(async (input: RegisterInput) => {
        await authService.register(input)
        setUser(await authService.getMe())
    }, [])

    const logout = useCallback(async () => {
        try {
            await authService.logout()
        } catch (err) {
            if (!isUnauthorized(err)) throw err
        }
        setUser(null)
    }, [])

    const value = useMemo<AuthContextValue>(
        () => ({ user, isLoading, login, register, logout }),
        [user, isLoading, login, register, logout]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}