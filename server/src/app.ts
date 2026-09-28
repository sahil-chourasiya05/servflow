import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'ServFlow API running' })
})

export default app