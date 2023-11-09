import mongoose from 'mongoose'
import { formatDate } from '../utils/functions'

const customerCountSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        unique: true,
        default: formatDate()
    },
    timestamp: {
        type: Number,
        required: true,
        default: Date.now()
    },
    done: {
        type: Number,
        required: true,
        default: 0
    },
    ongoing: {
        type: Number,
        required: true,
        default: 0
    },
    waiting: {
        type: Number,
        required: true,
        default: 0
    }
})

export default mongoose.model('CustomerCount', customerCountSchema)
