import express, { Application, Request, Response } from 'express'
import connectDB from './config/db.js'
import { env } from './config/env.js'
const { PORT } = env

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'ServFlow API running' })
})

app.post('/', (req: Request, res: Response) => {
    console.log(req.body)
    res.status(200).json({ received: req.body })
})

const startServer = async (): Promise<void> => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()