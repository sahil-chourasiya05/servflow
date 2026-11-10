import { Router } from 'express'
import { getNearbyProviders, updateOnlineStatus } from '@/controllers/providerController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'
import { authorizeRoles } from '@/middlewares/roleMiddleware.js'

const router = Router()

router.get('/nearby', authMiddleware, authorizeRoles('client'), getNearbyProviders)
router.patch('/me/online', authMiddleware, authorizeRoles('provider'), updateOnlineStatus)

export default router