import { Response } from 'express'
import { env } from '@/config/env.js'

const COOKIE_NAME = 'token'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export const setAuthCookie = (res: Response, token: string): void => {
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SEVEN_DAYS_MS,
    })
}

export const clearAuthCookie = (res: Response): void => {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
    })
}