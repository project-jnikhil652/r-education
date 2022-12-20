const Joi = require('joi');
const validators = require('../validators');

const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(5).required()
});

module.exports = validators.getBodyValidationMiddleware(schema);