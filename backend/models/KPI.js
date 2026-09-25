import mongoose from 'mongoose'

const kpiSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        target: {
            type: Number,
            required: true,
            min: 0
        },

        actual: {
            type: Number,
            default: 0,
            min: 0
        },

        achievementPercentage: {
            type: Number,
            default: 0,
            min: 0
        },

        status: {
            type: String,
            enum: [
                'Not Started',
                'In Progress',
                'Completed',
                'Over Achieved'
            ],
            default: 'Not Started'
        }
    },
    {
        timestamps: true
    }
)

const KPI = mongoose.model('KPI', kpiSchema)

export default KPI