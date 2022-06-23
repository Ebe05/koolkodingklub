const mongoose = require('mongoose')
const { Schema } = mongoose

const caseSchema = new Schema({
    title: String,
    category: {
        type: String,
        enum: ['criminal', 'probate', 'divorce', 'mental capacity', 'accident', 'others'],
    },
    description: String
})

const Case = mongoose.model('Case', caseSchema)

module.exports = Case