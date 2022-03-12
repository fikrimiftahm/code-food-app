const InvariantError = require('../../exceptions/InvariantError');
const { SearchPayloadSchema } = require('./schema');

const SearchValidator = {
    validateSearchPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = SearchPayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SearchValidator;
