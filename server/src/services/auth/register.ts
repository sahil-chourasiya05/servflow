import { Client } from '@/models/Client.js'
import { Provider } from '@/models/Provider.js'
import { User } from '@/models/User.js'
import { signToken } from '@/utils/jwt.js'
import { ApiError } from '@/utils/ApiError.js'
import { UserRole } from '@/types/index.js'

interface RegisterClientInput {
    name: string
    email: string
    password: string
    phone: string
    role: 'client'
}

interface RegisterProviderInput {
    name: string
    email: string
    password: string
    phone: string
    role: 'provider'
    category: string
    travelFee: number
    location: {
        type: 'Point'
        coordinates: [number, number]
    }
}

interface RegisterResult {
    user: {
        id: string
        name: string
        email: string
        role: UserRole
    }
    token: string
}

type RegisterInput = RegisterClientInput | RegisterProviderInput

export const registerUser = async (input: RegisterInput): Promise<RegisterResult> => {

    const normalizedEmail = input.email.trim().toLowerCase()
    const normalizedName = input.name.trim()
    if (!normalizedName || !normalizedEmail || !input.password || !input.role) {
        throw ApiError.badRequest('All required fields must be provided')
    }

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
        throw ApiError.conflict('Email is already registered')
    }

    const newUser =
        input.role === 'client'
            ? await Client.create(input)
            : await Provider.create(input)

    const token = signToken({
        id: newUser._id.toString(),
        role: newUser.role as UserRole,
    })

    return {
        user: {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
        token,
    }
}