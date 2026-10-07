import { Router } from 'express'
import { createRequest } from '@/controllers/requestController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'

const router = Router()

router.post('/', authMiddleware, createRequest)

export default router