import { Document, Types } from 'mongoose'

export type UserRole = 'client' | 'provider'

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