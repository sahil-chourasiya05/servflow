import { Schema, model } from 'mongoose'
import { IServiceRequest } from '@/types/index.js'

const serviceRequestSchema = new Schema<IServiceRequest>(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters'],
        },
        photoUrl: {
            type: String,
        },
        mode: {
            type: String,
            enum: ['direct', 'broadcast'],
            required: true,
        },
        targetProviders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
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
                    validator: (v: number[]) => v.length === 2,
                    message: 'Coordinates must contain exactly [longitude, latitude]',
                },
            },
        },
        status: {
            type: String,
            enum: ['open', 'closed', 'expired'],
            default: 'open',
        },
    },
    { timestamps: true }
)

serviceRequestSchema.index({ location: '2dsphere' })
serviceRequestSchema.index({ category: 1, status: 1 })

export const ServiceRequest = model<IServiceRequest>('ServiceRequest', serviceRequestSchema)