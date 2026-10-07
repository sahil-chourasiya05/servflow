import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { createServiceRequest } from '@/services/requestService.js'

export const createRequest = asyncHandler(async (req: Request, res: Response) => {
    const clientId = req.user!.id

    const request = await createServiceRequest({
        ...req.body,
        clientId,
    })

    res.status(201).json(new ApiResponse(201, 'Service request created successfully', request))
})