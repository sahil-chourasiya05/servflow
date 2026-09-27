import mongoose from 'mongoose'
import { env } from './env.js'

const { MONGO_URI, NODE_ENV } = env

let isConnected = false

const connectDB = async (): Promise<void> => {
    if (isConnected) {
        console.log('Using existing MongoDB connection')
        return
    }

    try {
        mongoose.set('strictQuery', true)

        const conn = await mongoose.connect(MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            autoIndex: NODE_ENV !== 'production',
        })

        isConnected = !!conn.connections[0]?.readyState
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('MongoDB connection failed:', error)
        process.exit(1)
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open')
})

mongoose.connection.on('error', (err) => {
    isConnected = false
    console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
    isConnected = false
    console.log('Mongoose connection disconnected')
})

const shutdown = async (signal: string): Promise<void> => {
    await mongoose.connection.close()
    console.log(`MongoDB connection closed (${signal})`)
    process.exit(0)
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))


export default connectDB