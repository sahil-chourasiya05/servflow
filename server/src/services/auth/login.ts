import { User } from '@/models/User.js'
import { signToken } from '@/utils/jwt.js'
import { ApiError } from '@/utils/ApiError.js'
import { UserRole } from '@/types/index.js'

interface LoginInput {
    email: string
    password: string
}

interface LoginResult {
    user: {
        id: string
        name: string
        email: string
        role: UserRole
    }
    token: string
}

export const loginUser = async (input: LoginInput): Promise<LoginResult> => {

    const normalizedEmail = input.email.trim().toLowerCase()
    if (!normalizedEmail || !input.password) {
        throw ApiError.badRequest('Email and password are required')
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+password')
    if (!user) {
        throw ApiError.unauthorized('Invalid email or password')
    }

    const isPasswordValid = await user.comparePassword(input.password)
    if (!isPasswordValid) {
        throw ApiError.unauthorized('Invalid email or password')
    }

    const token = signToken({
        id: user._id.toString(),
        role: user.role,
    })

    return {
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    }
}