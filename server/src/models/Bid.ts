import { Schema, model } from 'mongoose'
import { IBid } from '@/types/index.js'
import {
    BID_STATUSES,
    MAX_BID_NOTE_LENGTH,
    MAX_BID_PRICE,
    MAX_ETA_MINUTES,
    MIN_BID_PRICE,
    MIN_ETA_MINUTES,
} from '@/constants/bid.js'

const bidSchema = new Schema<IBid>(
    {
        request: {
            type: Schema.Types.ObjectId,
            ref: 'ServiceRequest',
            required: [true, 'Request is required'],
        },
        provider: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Provider is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [MIN_BID_PRICE, `Price must be at least ₹${MIN_BID_PRICE}`],
            max: [MAX_BID_PRICE, `Price cannot exceed ₹${MAX_BID_PRICE}`],
            validate: {
                validator: Number.isInteger,
                message: 'Price must be a whole number',
            },
        },
        etaMinutes: {
            type: Number,
            required: [true, 'Arrival time is required'],
            min: [MIN_ETA_MINUTES, `Arrival time must be at least ${MIN_ETA_MINUTES} minute`],
            max: [MAX_ETA_MINUTES, `Arrival time cannot exceed ${MAX_ETA_MINUTES} minutes`],
            validate: {
                validator: Number.isInteger,
                message: 'Arrival time must be a whole number of minutes',
            },
        },
        note: {
            type: String,
            trim: true,
            maxlength: [MAX_BID_NOTE_LENGTH, `Note cannot exceed ${MAX_BID_NOTE_LENGTH} characters`],
        },
        status: {
            type: String,
            enum: BID_STATUSES,
            default: 'pending',
        },
    },
    { timestamps: true }
)

bidSchema.index({ request: 1, provider: 1 }, { unique: true })
bidSchema.index({ provider: 1, createdAt: -1 })

export const Bid = model<IBid>('Bid', bidSchema)