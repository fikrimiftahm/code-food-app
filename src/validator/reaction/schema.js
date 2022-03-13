const Joi = require('joi');

const ReactionPayloadSchema = Joi.object({
    reaction: Joi.string()
        .required()
        .valid(
            'like',
            'dislike',
            'neutral',
        )
        .insensitive()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
});

module.exports = { ReactionPayloadSchema };
