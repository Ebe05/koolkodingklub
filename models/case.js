const mongoose = require('mongoose')
const { Schema } = mongoose

const caseSchema = new Schema({
    title: String,
    category: {
        type: String,
        enum: ['criminal', 'probate', 'divorce', 'mental capacity', 'accident', 'others'],
    },
    description: String,
    date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Case = mongoose.model('Case', caseSchema)

module.exports = Case