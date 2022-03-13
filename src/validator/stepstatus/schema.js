const Joi = require('joi');

const StepStatusPayloadSchema = Joi.object({
    stepOrder: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
});

module.exports = { StepStatusPayloadSchema };
