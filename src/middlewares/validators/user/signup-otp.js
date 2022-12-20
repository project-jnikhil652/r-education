const Joi = require('joi');
const validators = require('../validators');

const schema = Joi.object({
    userIdentifier: Joi.alternatives(Joi.string().email(), Joi.string().length(10).pattern(/^\d+$/)).required(),
    otp: Joi.string().length(6).pattern(/^\d{6}/)
});

module.exports = validators.getBodyValidationMiddleware(schema);
