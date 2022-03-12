const Joi = require('joi');

const RecipePayloadSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
    recipeCategoryId: Joi.number()
        .integer()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
    image: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
    nServing: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
    ingredientsPerServing: Joi.array()
        .items(
            Joi.object().keys({
                item: Joi.string()
                    .required()
                    .messages({
                        'any.required': `{{#label}} is required`,
                    }),
                unit: Joi.string()
                    .required()
                    .messages({
                        'any.required': `{{#label}} is required`,
                    }),
                value: Joi.number()
                    .integer()
                    .min(1)
                    .required()
                    .messages({
                        'any.required': `{{#label}} is required`,
                    }),
            }),
        ),
    steps: Joi.array()
        .items(
            Joi.object().keys({
                stepOrder: Joi.number()
                    .integer()
                    .min(1)
                    .required()
                    .messages({
                        'any.required': `{{#label}} is required`,
                    }),
                description: Joi.string()
                    .required()
                    .messages({
                        'any.required': `{{#label}} is required`,
                    }),
            }),
        ),
});

module.exports = { RecipePayloadSchema };
