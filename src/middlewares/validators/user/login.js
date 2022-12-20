const Joi = require('joi');
const validators = require('../validators');

const schema = Joi.object({
    userIdentifier: Joi.alternatives(Joi.string().email(), Joi.string().length(10).pattern(/^\d+$/)).required(),
    password: Joi.string().required()
})

module.exports = validators.getBodyValidationMiddleware(schema);

