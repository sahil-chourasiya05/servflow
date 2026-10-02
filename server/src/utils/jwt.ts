import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from '@/config/env.js'
import { UserRole } from '@/types/index.js'

export interface JwtPayload {
    id: string
    role: UserRole
}

const JWT_EXPIRES_IN: SignOptions['expiresIn'] = '7d'

export const signToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    })
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload
}