import { Schema } from 'mongoose'
import { User } from './User.js'
import { IProvider } from '@/types/index.js'

const providerSchema = new Schema<IProvider>({
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    travelFee: {
        type: Number,
        required: [true, 'Travel fee is required'],
        min: [0, 'Travel fee cannot be negative'],
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: [true, 'Coordinates are required'],
            validate: {
                validator: function (v: number[]) {
                    return v.length === 2;
                },
                message: 'Coordinates must contain exactly [longitude, latitude]'
            }
        }
    },
})

providerSchema.index({
    category: 1,
    location: '2dsphere'
})

export const Provider = User.discriminator<IProvider>('provider', providerSchema)