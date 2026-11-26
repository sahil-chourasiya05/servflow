import { Request, Response } from 'express'
import { asyncHandler } from '@/utils/asyncHandler.js'
import { ApiResponse } from '@/utils/ApiResponse.js'
import { placeBid } from '@/services/bid/placeBid.js'
import { getRequestBids } from '@/services/bid/getRequestBids.js'
import { acceptBid } from '@/services/bid/acceptBid.js'

export const createBid = asyncHandler(async (req: Request, res: Response) => {
    const { price, etaMinutes, note } = req.body

    const bid = await placeBid({
        requestId: req.params.requestId as string,
        providerId: req.user!.id,
        price,
        etaMinutes,
        note,
    })

    res.status(201).json(new ApiResponse(201, 'Bid placed successfully', bid))
})

export const listRequestBids = asyncHandler(async (req: Request, res: Response) => {
    const bids = await getRequestBids(req.params.requestId as string, req.user!.id)

    res.status(200).json(new ApiResponse(200, 'Bids fetched successfully', bids))
})

export const acceptRequestBid = asyncHandler(async (req: Request, res: Response) => {
    const { bid } = await acceptBid(req.params.bidId as string, req.user!.id)

    res.status(200).json(new ApiResponse(200, 'Bid accepted successfully', bid))
})