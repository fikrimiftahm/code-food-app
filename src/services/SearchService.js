const op = require('sequelize').Sequelize.Op;
const InvariantError = require('../exceptions/InvariantError');
const Recipes = require('../models/recipes');

class SearchService {
    async searchRecipes(limit, q) {
        try {
            const recipes = await Recipes.findAll({
                raw: true,
                attributes: [
                    'id', 'name',
                ],
                where: {
                    name: {
                        [op.like]: `%${q}%`,
                    },
                },
                limit: limit ? parseInt(limit) : 5,
            });

            return recipes;
        } catch (err) {
            throw new InvariantError(err);
        }
    }
}

module.exports = SearchService;
