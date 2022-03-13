const Joi = require('joi');

const ServePayloadSchema = Joi.object({
    nServing: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.min': 'Target serving minimum 1',
            'any.required': `{{#label}} is required`,
            'number.base': `Invalid target serving`,
        }),
    recipeId: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
            'number.base': `Invalid recipe id`,
        }),
});

module.exports = { ServePayloadSchema };
