const InvariantError = require('../../exceptions/InvariantError');
const { StepStatusPayloadSchema } = require('./schema');

const StepStatusValidator = {
    validateServePayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = StepStatusPayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = StepStatusValidator;
