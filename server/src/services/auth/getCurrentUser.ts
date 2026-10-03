import { User } from '@/models/User.js'
import { ApiError } from '@/utils/ApiError.js'

export const getCurrentUser = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
        throw ApiError.notFound('User not found')
    }

    return user
}