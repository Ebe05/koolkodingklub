const Joi = require('joi');
const caseSchema = Joi.object({
    title: Joi.string(),
    category: Joi.string(),
    description: Joi.string(),
    date: Joi.string()
        .isoDate(),
    time: Joi.string()
})

module.exports = caseSchema