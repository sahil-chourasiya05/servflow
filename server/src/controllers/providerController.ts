import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { ApiError } from '@/utils/ApiError.js'
import { setOnlineStatus } from '@/services/provider/setOnlineStatus.js'

export const updateOnlineStatus = asyncHandler(async (req: Request, res: Response) => {
    const { isOnline } = req.body

    if (typeof isOnline !== 'boolean') {
        throw ApiError.badRequest('isOnline must be true or false')
    }

    const provider = await setOnlineStatus(req.user!.id, isOnline)

    res.status(200).json(
        new ApiResponse(200, isOnline ? 'You are now online' : 'You are now offline', {
            isOnline: provider.isOnline,
        })
    )
})