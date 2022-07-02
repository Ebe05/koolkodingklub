const mongoose = require('mongoose')
const { Schema } = mongoose

const appointmentSchema = new Schema({
    lawyer: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment