import { Router } from 'express'
import { updateOnlineStatus } from '@/controllers/providerController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'
import { authorizeRoles } from '@/middlewares/roleMiddleware.js'

const router = Router()

router.patch('/me/online', authMiddleware, authorizeRoles('provider'), updateOnlineStatus)

export default router