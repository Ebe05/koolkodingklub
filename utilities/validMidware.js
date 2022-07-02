const appointmentSchema = require('../validationSchemas/appointmentSchema')
const caseSchema = require('../validationSchemas/caseSchema')

module.exports.appointment = (req, res, next) => {
    const { error } = appointmentSchema.validate(req.body)
    if (error) {
        next(error)
    }
    else {
        next()
    }
}

module.exports.case = (req, res, next) => {
    const { error } = caseSchema.validate(req.body)
    if (error) {
        next(error)
    }
    else {
        next()
    }
}
