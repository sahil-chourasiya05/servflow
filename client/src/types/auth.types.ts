export type UserRole = 'client' | 'provider'

export interface GeoPoint {
    type: 'Point'
    coordinates: [number, number]
}

interface BaseUser {
    _id: string
    name: string
    email: string
    phone: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface ClientUser extends BaseUser {
    role: 'client'
    savedAddresses: {
        _id?: string
        label: string
        location: GeoPoint
    }[]
}

export interface ProviderUser extends BaseUser {
    role: 'provider'
    category: string
    travelFee: number
    isOnline: boolean
    location: GeoPoint
}

export type User = ClientUser | ProviderUser

export interface LoginInput {
    email: string
    password: string
}

interface RegisterBase extends LoginInput {
    name: string
    phone: string
}

export interface RegisterClientInput extends RegisterBase {
    role: 'client'
    savedAddresses: {
        label: string;
        location: GeoPoint
    }[]
}

export interface RegisterProviderInput extends RegisterBase {
    role: 'provider'
    category: string
    travelFee: number
    location: GeoPoint
}

export type RegisterInput = RegisterClientInput | RegisterProviderInput

export interface ApiResponse<T> {
    success: boolean
    statusCode: number
    message: string
    data: T
}