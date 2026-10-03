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
    savedAddresses: {
        label: string
        location: {
            type: 'Point'
            coordinates: [number, number]
        }
    }[]
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
    if (!normalizedName ||
        !normalizedEmail ||
        !input.password ||
        !input.phone ||
        !input.role
    ) {
        throw ApiError.badRequest('All required fields must be provided')
    }

    if (input.role === 'provider') {
        if (
            !input.category ||
            !input.location ||
            input.travelFee === undefined
        ) {
            throw ApiError.badRequest('Provider fields are required')
        }
    } else if (input.role === 'client') {
        if (!input.savedAddresses || !Array.isArray(input.savedAddresses)) {
            throw ApiError.badRequest('Saved addresses are required')
        }

        for (const addr of input.savedAddresses) {
            if (!addr?.label || !addr?.location?.coordinates) {
                throw ApiError.badRequest('Invalid address format')
            }
        }
    }

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
        throw ApiError.conflict('Email is already registered')
    }

    const newUser =
        input.role === 'client'
            ? await Client.create({
                ...input,
                name: normalizedName,
                email: normalizedEmail
            })
            : await Provider.create({
                ...input,
                name: normalizedName,
                email: normalizedEmail
            })

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