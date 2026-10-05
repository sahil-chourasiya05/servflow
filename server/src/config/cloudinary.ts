import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { env } from '@/config/env.js'

cloudinary.config({
    cloud_name: env.CLOUDINARY.cloudName,
    api_key: env.CLOUDINARY.apiKey,
    api_secret: env.CLOUDINARY.apiSecret
})

const uploadOnCloudinary = async (filePath: string): Promise<string | null> => {
    if (!filePath) {
        return null
    }

    try {
        const result = await cloudinary.uploader.upload(filePath)
        return result.secure_url
    } catch (error) {
        console.error('Cloudinary upload failed:', error)
        return null
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Failed to delete local file:', err)
            }
        })
    }
}

export default uploadOnCloudinary