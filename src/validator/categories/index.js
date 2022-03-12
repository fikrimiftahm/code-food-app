const InvariantError = require('../../exceptions/InvariantError');
const { CategoryPayloadSchema } = require('./schema');

const CategoriesValidator = {
    validateCategoriesPayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = CategoryPayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = CategoriesValidator;
