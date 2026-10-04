import { Router } from 'express'
import { register, login, getMe, logout } from '@/controllers/authController.js'
import { authMiddleware } from '@/middlewares/authMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getMe)
router.post('/logout', logout)

export default router