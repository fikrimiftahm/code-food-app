const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': `{{#label}} minimum 6 characters`,
            'any.required': `{{#label}} is required`,
        }),
});

module.exports = { UserPayloadSchema };
