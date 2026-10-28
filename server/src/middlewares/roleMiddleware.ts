import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/utils/ApiError.js'
import type { UserRole } from '@/types/index.js'

export const authorizeRoles = (...roles: UserRole[]) =>
    (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            return next(
                ApiError.unauthorized('Authentication required')
            )
        }

        if (!roles.includes(req.user.role)) {
            return next(
                ApiError.forbidden('You do not have permission to perform this action')
            )
        }

        next()
    }