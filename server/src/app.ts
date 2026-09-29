import express, { Application, Request, Response } from 'express'
import { errorMiddleware, notFoundHandler } from './middlewares/errorMiddleware.js'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(notFoundHandler)
app.use(errorMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'ServFlow API running' })
})

export default app