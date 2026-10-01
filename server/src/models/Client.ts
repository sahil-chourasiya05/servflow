import { Schema } from 'mongoose'
import { User } from './User.js'
import { IClient } from '@/types/index.js'

const clientSchema = new Schema<IClient>({
    savedAddresses: [
        {
            label: {
                type: String,
                required: true,
                trim: true
            },
            location: {
                type: {
                    type: String,
                    enum: ['Point'],
                    default: 'Point',
                },
                coordinates: {
                    type: [Number],
                    required: true,
                },
            },
        },
    ],
})

export const Client = User.discriminator<IClient>('client', clientSchema)