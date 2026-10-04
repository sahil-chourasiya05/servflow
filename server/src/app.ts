import express, { Application, Request, Response } from 'express'
import { errorMiddleware, notFoundHandler } from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import authRoutes from '@/routes/authRoutes.js'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.use(notFoundHandler)
app.use(errorMiddleware)

export default app