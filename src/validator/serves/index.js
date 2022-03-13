const InvariantError = require('../../exceptions/InvariantError');
const { ServePayloadSchema } = require('./schema');

const ServeValidator = {
    validateServePayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = ServePayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = ServeValidator;
