import { Document, Types } from 'mongoose'

export type UserRole = 'client' | 'provider'
export type RequestMode = 'direct' | 'broadcast'
export type RequestStatus = 'open' | 'closed' | 'expired'

export interface IUser extends Document {
    _id: Types.ObjectId
    name: string
    email: string
    password: string
    phone: string
    role: UserRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}
export interface IClient extends IUser {
    role: 'client'
    savedAddresses?: {
        label: string
        location: {
            type: 'Point'
            coordinates: [number, number]
        }
    }[]
}
export interface IProvider extends IUser {
    role: 'provider'
    category: string
    travelFee: number
    isOnline: boolean
    location: {
        type: 'Point'
        coordinates: [number, number]
    }
}
export interface IServiceRequest extends Document {
    _id: Types.ObjectId
    client: Types.ObjectId
    category: string
    description: string
    photoUrl?: string
    mode: RequestMode
    targetProviders?: Types.ObjectId[]
    location: {
        type: 'Point'
        coordinates: [number, number]
    }
    status: RequestStatus
    createdAt: Date
    updatedAt: Date
}