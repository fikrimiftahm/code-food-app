const InvariantError = require('../exceptions/InvariantError');
const RecipesReactions = require('../models/recipesReactions');

class ReactionService {
    async addReaction(reaction) {
        try {
            const recipes = await RecipesReactions.create(reaction);

            return recipes;
        } catch (err) {
            throw new InvariantError(err);
        }
    }
}

module.exports = ReactionService;
