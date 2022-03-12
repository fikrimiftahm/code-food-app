const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
});

const PutAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string()
        .required()
        .messages({
            'any.required': `{{#label}} is required`,
        }),
});

module.exports = {
    PostAuthenticationPayloadSchema,
    PutAuthenticationPayloadSchema,
    DeleteAuthenticationPayloadSchema,
};
