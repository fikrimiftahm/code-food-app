const InvariantError = require('../../exceptions/InvariantError');
const { UserPayloadSchema } = require('./schema');

const UsersValidator = {
    validateUserPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = UserPayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = UsersValidator;
