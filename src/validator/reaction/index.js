const InvariantError = require('../../exceptions/InvariantError');
const { ReactionPayloadSchema } = require('./schema');

const ReactionValidator = {
    validateReactionPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = ReactionPayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = ReactionValidator;
