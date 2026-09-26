import dotenv from "dotenv"
import path from "node:path"

dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] ?? defaultValue
    if (!value) {
        console.error(`❌ [Config Error]: Missing required environment variable: ${key}`)
        process.exit(1)
    }
    return value
}

export const env = {
    PORT: Number(getEnv("PORT", "5000")),
    NODE_ENV: getEnv("NODE_ENV", "development"),
    CLIENT_ORIGIN: getEnv("CLIENT_ORIGIN", "http://localhost:5173"),
    MONGO_URI: getEnv("MONGO_URI"),
    CLOUDINARY: {
        cloudName: getEnv("CLOUDINARY_CLOUD_NAME"),
        apiKey: getEnv("CLOUDINARY_API_KEY"),
        apiSecret: getEnv("CLOUDINARY_API_SECRET"),
    },
}