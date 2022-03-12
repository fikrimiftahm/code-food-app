const {
    PostAuthenticationPayloadSchema,
    PutAuthenticationPayloadSchema,
    DeleteAuthenticationPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
    validatePostAuthenticationPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = PostAuthenticationPayloadSchema.validate(payload, options);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validatePutAuthenticationPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = PutAuthenticationPayloadSchema.validate(payload, options);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateDeleteAuthenticationPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = DeleteAuthenticationPayloadSchema.validate(payload, options);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = AuthenticationsValidator;
