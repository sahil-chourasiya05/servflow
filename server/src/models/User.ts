import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '@/types/models.types.js'

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],

        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number'],
        },
        role: {
            type: String,
            enum: ['client', 'provider'],
            required: [true, 'Role is required'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        discriminatorKey: 'role',
    }
)

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    if (!this.password) {
        throw new Error('Password not selected. Use .select(\'+password\') in your query.')
    }
    return bcrypt.compare(candidatePassword, this.password)
}

export const User = model<IUser>('User', userSchema)