const Joi = require('joi');
const validators = require('../validators');

const schema = Joi.object({
    passwordResetToken: Joi.string().required(),
    password: Joi.string().min(5).required()
})

module.exports = validators.getBodyValidationMiddleware(schema);