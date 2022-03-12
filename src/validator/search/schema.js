const Joi = require('joi');

const SearchPayloadSchema = Joi.object({
    limit: Joi.number()
        .integer()
        .min(1)
        .optional(),
    q: Joi.string()
        .min(2)
        .required()
        .messages({
            'string.min': `{{#label}} minimum 2 characters`,
            'any.required': `{{#label}} is required`,
        }),
});

module.exports = { SearchPayloadSchema };
