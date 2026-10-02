import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@/utils/jwt.js'
import { ApiError } from '@/utils/ApiError.js'
import { asyncHandler } from '@/utils/asyncHandler.js'

export const authMiddleware = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const tokenFromCookie = req.cookies?.token
        const tokenFromHeader = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : undefined

        const token = tokenFromCookie || tokenFromHeader

        if (!token) {
            throw ApiError.unauthorized('Authentication token missing')
        }

        try {
            const decoded = verifyToken(token)
            req.user = decoded
            next()
        } catch (err) {
            throw ApiError.unauthorized('Invalid or expired token')
        }
    }
)