const Joi = require('joi');

const CategoryPayloadSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
});

module.exports = { CategoryPayloadSchema };
