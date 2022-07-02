const Joi = require('joi');
const appointmentSchema = Joi.object({
    date: Joi.string()
        .isoDate()
})

module.exports = appointmentSchema