const { sequelize } = require('../utils/sequelize');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const Recipes = require('../models/recipes');
const Categories = require('../models/categories');
const Ingredients = require('../models/ingredients');
const Steps = require('../models/steps');
const RecipesReactions = require('../models/recipesReactions');
const UsersCooks = require('../models/usersCooks');
const UsersHistories = require('../models/usersHistories');

class RecipesService {
    async getRecipes() {
        try {
            const recipes = await Recipes.findAll({
                raw: true,
                // include: Categories,
            });

            for (const recipe of recipes) {
                const cat = await Categories.findOne({
                    where: {
                        id: recipe.category_id,
                    },
                });
                recipe.recipeCategory = cat;
            }

            return recipes;
        } catch (err) {
            throw new InvariantError(err);
        }
    }

    async getRecipeById(id, nServing) {
        try {
            const recipe = await Recipes.findOne({
                raw: true,
                where: {
                    id: id,
                },
                // include: Categories,
            });

            if (recipe) {
                const cat = await Categories.findOne({
                    attributes: [
                        'category_id',
                    ],
                    where: {
                        id: recipe.category_id,
                    },
                });
                recipe.recipeCategory = cat;

                const reactions = await RecipesReactions.findAll({
                    raw: true,
                    attributes: [
                        'reaction', [sequelize.fn('COUNT', 'reaction'), 'count'],
                    ],
                    where: {
                        recipe_id: recipe.id,
                    },
                    group: 'reaction',
                    order: [
                        ['reaction', 'ASC'],
                    ],
                });

                recipe.nReactionLike = 0;
                recipe.nReactionDislike = 0;
                recipe.nReactionNeutral = 0;
                for (const reaction of reactions) {
                    switch (reaction.reaction) {
                        case 'Like':
                            recipe.nReactionLike = reaction.count;
                            break;
                        case 'Dislike':
                            recipe.nReactionDislike = reaction.count;
                            break;
                        case 'Neutral':
                            recipe.nReactionNeutral = reaction.count;
                            break;
                    }
                }
                recipe.nServing = nServing;

                const ingredients = await Ingredients.findAll({
                    raw: true,
                    attributes: [
                        'item', 'unit', 'value',
                    ],
                    where: {
                        recipe_id: recipe.id,
                    },
                });
                recipe.ingredientsPerServing = ingredients;

                return recipe;
            } else {
                throw new NotFoundError(`Recipe with id ${id} not found`);
            }
        } catch (err) {
            if (err.name === 'NotFoundError') {
                throw new NotFoundError(err);
            } else {
                throw new InvariantError(err);
            }
        }
    }

    async getRecipeStepsById(id) {
        try {
            const recipeStep = await Steps.findAll({
                raw: true,
                attributes: [
                    'stepOrder', 'description',
                ],
                where: {
                    recipe_id: id,
                },
            });

            if (recipeStep.length > 0) {
                return recipeStep;
            } else {
                throw new NotFoundError(`Recipe with id ${id} not found`);
            }
        } catch (err) {
            if (err.name === 'NotFoundError') {
                throw new NotFoundError(err);
            }
            throw new InvariantError(err);
        }
    }

    async addRecipes(recipe, steps, ingredients, nServing) {
        try {
            const recipeResult = await Recipes.create(recipe);
            ingredients.map((ingredient) => {
                ingredient.recipe_id = recipeResult.getDataValue('id');
                return ingredient;
            });
            const ingredientsResult = await Ingredients.bulkCreate(ingredients);
            steps.map((step) => {
                step.recipe_id = recipeResult.getDataValue('id');
                return step;
            });
            const stepsResult = await Steps.bulkCreate(steps);

            const reactions = await RecipesReactions.findAll({
                raw: true,
                attributes: [
                    'reaction', [sequelize.fn('COUNT', 'reaction'), 'count'],
                ],
                where: {
                    recipe_id: recipeResult.id,
                },
                group: 'reaction',
                order: [
                    ['reaction', 'ASC'],
                ],
            });

            recipe.nReactionLike = 0;
            recipe.nReactionDislike = 0;
            recipe.nReactionNeutral = 0;
            for (const reaction of reactions) {
                switch (reaction.reaction) {
                    case 'Like':
                        recipe.nReactionLike = reaction.count;
                        break;
                    case 'Dislike':
                        recipe.nReactionDislike = reaction.count;
                        break;
                    case 'Neutral':
                        recipe.nReactionNeutral = reaction.count;
                        break;
                }
            }

            const response = {
                id: recipeResult.id,
                name: recipeResult.name,
                recipeCategoryId: recipeResult.category_id,
                image: recipeResult.image,
                nServing: nServing,
                ingredientsPerServing: ingredientsResult.map((ingredients) => {
                    return {
                        item: ingredients.item,
                        unit: ingredients.unit,
                        value: ingredients.value,
                    };
                }),
                steps: stepsResult.map((steps) => {
                    return {
                        stepOrder: steps.stepOrder,
                        description: steps.description,
                    };
                }),
                nReactionLike: recipe.nReactionLike,
                nReactionDislike: recipe.nReactionDislike,
                nReactionNeutral: recipe.nReactionNeutral,
                createdAt: recipeResult.createdAt,
                updatedAt: recipeResult.updatedAt,
            };

            return response;
        } catch (err) {
            throw new InvariantError(err);
        }
    }

    async updateRecipes(id, recipe, steps, ingredients, nServing) {
        try {
            const recipeResult = await Recipes.findOne({
                raw: true,
                where: {
                    id: parseInt(id),
                },
            });

            if (!recipeResult) throw new NotFoundError(`Recipe with id ${id} not found`);

            await Recipes.update(
                recipe,
                {
                    where: {
                        id: parseInt(id),
                    },
                },
            );

            ingredients.map((ingredient) => {
                ingredient.recipe_id = parseInt(id);
                return ingredient;
            });
            const ingredientsResult = await Ingredients.bulkCreate(
                ingredients,
                {
                    updateOnDuplicate: ['recipe_id'],
                },
            );

            steps.map((step) => {
                step.recipe_id = parseInt(id);
                return step;
            });
            const stepsResult = await Steps.bulkCreate(
                steps,
                {
                    updateOnDuplicate: ['recipe_id', 'step_order'],
                },
            );

            const reactions = await RecipesReactions.findAll({
                raw: true,
                attributes: [
                    'reaction', [sequelize.fn('COUNT', 'reaction'), 'count'],
                ],
                where: {
                    recipe_id: parseInt(id),
                },
                group: 'reaction',
                order: [
                    ['reaction', 'ASC'],
                ],
            });

            recipe.nReactionLike = 0;
            recipe.nReactionDislike = 0;
            recipe.nReactionNeutral = 0;
            for (const reaction of reactions) {
                switch (reaction.reaction) {
                    case 'Like':
                        recipe.nReactionLike = reaction.count;
                        break;
                    case 'Dislike':
                        recipe.nReactionDislike = reaction.count;
                        break;
                    case 'Neutral':
                        recipe.nReactionNeutral = reaction.count;
                        break;
                }
            }

            const response = {
                id: recipeResult.id,
                name: recipeResult.name,
                recipeCategoryId: recipeResult.category_id,
                image: recipeResult.image,
                nServing: nServing,
                ingredientsPerServing: ingredientsResult.map((ingredients) => {
                    return {
                        item: ingredients.item,
                        unit: ingredients.unit,
                        value: ingredients.value,
                    };
                }),
                steps: stepsResult.map((steps) => {
                    return {
                        stepOrder: steps.stepOrder,
                        description: steps.description,
                    };
                }),
                nReactionLike: recipe.nReactionLike,
                nReactionDislike: recipe.nReactionDislike,
                nReactionNeutral: recipe.nReactionNeutral,
                createdAt: recipeResult.createdAt,
                updatedAt: recipeResult.updatedAt,
            };

            return response;
        } catch (err) {
            if (err.name === 'NotFoundError') {
                throw new NotFoundError(err);
            } else {
                throw new InvariantError(err);
            }
        }
    }

    async deleteRecipe(id) {
        try {
            const recipe = await Recipes.findOne({
                raw: true,
                where: {
                    id: id,
                },
            });

            if (!recipe) throw new NotFoundError(`Recipe with id ${id} not found`);

            await RecipesReactions.destroy({
                where: {
                    recipe_id: id,
                },
            });

            await Steps.destroy({
                where: {
                    recipe_id: id,
                },
            });

            await Ingredients.destroy({
                where: {
                    recipe_id: id,
                },
            });

            await UsersCooks.destroy({
                where: {
                    recipe_id: id,
                },
            });

            await UsersHistories.destroy({
                where: {
                    recipe_id: id,
                },
            });

            await Recipes.destroy({
                where: {
                    id: id,
                },
            });

            return {};
        } catch (err) {
            if (err.name === 'NotFoundError') {
                throw new NotFoundError(err);
            } else {
                throw new InvariantError(err);
            }
        }
    }
}

module.exports = RecipesService;
