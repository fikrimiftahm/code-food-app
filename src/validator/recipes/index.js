const InvariantError = require('../../exceptions/InvariantError');
const { RecipePayloadSchema } = require('./schema');

const RecipesValidator = {
    validateRecipePayload: (payload) => {
        const options = {
            errors: {
                wrap: {
                    label: '',
                },
            },
        };
        const validationResult = RecipePayloadSchema.validate(payload, options);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = RecipesValidator;
