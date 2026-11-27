import { Router } from 'express'
import { createRequest, listIncomingRequests } from '@/controllers/requestController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'
import { authorizeRoles } from '@/middlewares/roleMiddleware.js'
import { createBid, listRequestBids } from '@/controllers/bidController.js'

const router = Router()

router.post('/', authMiddleware, authorizeRoles('client'), createRequest)
router.post('/:requestId/bids', authMiddleware, authorizeRoles('provider'), createBid)
router.get('/:requestId/bids', authMiddleware, authorizeRoles('client'), listRequestBids)
router.get('/incoming', authMiddleware, authorizeRoles('provider'), listIncomingRequests)

export default router