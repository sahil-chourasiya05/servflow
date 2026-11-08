import { Router } from 'express'
import { createRequest } from '@/controllers/requestController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'
import { authorizeRoles } from '@/middlewares/roleMiddleware.js'

const router = Router()

router.post('/', authMiddleware, authorizeRoles('client'), createRequest)

export default router