import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { createServiceRequest } from '@/services/requestService.js'

export const createRequest = asyncHandler(async (req: Request, res: Response) => {
    const { category, description, mode, targetProviders, longitude, latitude, radiusKm } =
        req.body

    const request = await createServiceRequest({
        clientId: req.user!.id,
        category,
        description,
        mode,
        targetProviders,
        longitude,
        latitude,
        radiusKm,
    })

    res.status(201).json(new ApiResponse(201, 'Service request created successfully', request))
})