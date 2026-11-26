import { Router } from 'express'
import { acceptRequestBid } from '@/controllers/bidController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'
import { authorizeRoles } from '@/middlewares/roleMiddleware.js'

const router = Router()

router.patch('/:bidId/accept', authMiddleware, authorizeRoles('client'), acceptRequestBid)

export default router