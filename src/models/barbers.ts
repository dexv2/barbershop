import mongoose from 'mongoose'

const barberSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
    },
    startTimestamp: {
        type: Number,
        default: 0
    },
    endTimestamp: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Barber', barberSchema)
