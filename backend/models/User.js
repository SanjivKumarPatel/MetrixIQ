import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },

        password: {
            type: String,
            required: true,
            select: false,
            minlength: 6
        },

        role: {
            type: String,
            enum: ['admin', 'employee'],
            default: 'employee'
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User