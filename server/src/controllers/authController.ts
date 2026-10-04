import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { setAuthCookie, clearAuthCookie } from '@/utils/setAuthCookie.js'
import { registerUser } from '@/services/auth/register.js'
import { loginUser } from '@/services/auth/login.js'
import { getCurrentUser } from '@/services/auth/getCurrentUser.js'

export const register = asyncHandler(async (req: Request, res: Response) => {
    const result = await registerUser(req.body)
    setAuthCookie(res, result.token)
    res.status(201).json(new ApiResponse(201, 'Registered successfully', result.user))
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const result = await loginUser(req.body)
    setAuthCookie(res, result.token)
    res.status(200).json(new ApiResponse(200, 'Logged in successfully', result.user))
})

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await getCurrentUser(req.user!.id)
    res.status(200).json(new ApiResponse(200, 'User fetched successfully', user))
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
    clearAuthCookie(res)
    res.status(200).json(new ApiResponse(200, 'Logged out successfully'))
})