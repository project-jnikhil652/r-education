const Joi = require('joi');
const validators = require('../validators');

const schema = Joi.object({
    otp: Joi.string().length(6).pattern(/^\d{6}$/),
    userIdentifier: Joi.alternatives(Joi.string().email(), Joi.string().length(10).pattern(/^\d+$/)).required()
})

module.exports = validators.getBodyValidationMiddleware(schema);