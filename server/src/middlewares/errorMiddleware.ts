import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
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

    if (err instanceof MongooseError.ValidationError) {
        const errors = Object.fromEntries(
            Object.entries(err.errors).map(([field, fieldError]) => [field, fieldError.message])
        )

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        })
    }

    if (err instanceof MongooseError.CastError) {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}`,
        })
    }

    if (typeof err === 'object' && err !== null && 'code' in err && err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'A record with this value already exists',
        })
    }

    console.error(err)

    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    })
}