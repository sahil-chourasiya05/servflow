import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { createServiceRequest, getIncomingRequests } from '@/services/requestService.js'

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

export const listIncomingRequests = asyncHandler(async (req: Request, res: Response) => {
    const requests = await getIncomingRequests(req.user!.id)

    res.status(200).json(new ApiResponse(200, 'Incoming requests fetched successfully', requests))
})