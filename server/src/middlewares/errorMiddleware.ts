import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/utils/ApiError.js'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`))
}

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        })
    }

    console.error(err)

    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    })
}