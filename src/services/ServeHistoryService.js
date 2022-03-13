const { mySqlCon } = require('../utils/mysql-con');
const InvariantError = require('../exceptions/InvariantError');
const Categories = require('../models/categories');
const Recipes = require('../models/recipes');
const RecipesReactions = require('../models/recipesReactions');
const Steps = require('../models/steps');
const UsersCooks = require('../models/usersCooks');
const UsersHistories = require('../models/usersHistories');
const UsersSteps = require('../models/usersSteps');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthorizationError = require('../exceptions/AuthorizationError');

class ServeHistoryService {
    async getServesHistory(id, categoryId = null, sort = null, limit = 10, skip = 0, status = '') {
        return new Promise((resolve, reject) => {
            try {
                let categories;
                if (categoryId) {
                    categories = [categoryId];
                } else {
                    categories = [1, 2, 3, 4, 5];
                }

                let sortArray;
                switch (sort) {
                    case 'newest':
                        sortArray = ['created_at', 'DESC'];
                        break;
                    case 'oldest':
                        sortArray = ['created_at', 'ASC'];
                        break;
                    case 'nserve_asc':
                        sortArray = ['us.n_of_serving', 'ASC'];
                        break;
                    case 'nserve_desc':
                        sortArray = ['us.n_of_serving', 'DESC'];
                        break;
                    default:
                        sortArray = ['us.created_at', 'DESC'];
                }

                const query = `
                    SELECT us.id, 
                    us.n_of_serving nServing, 
                    ur.reaction,
                    uh.status, 
                    r.id recipeId, 
                    r.name recipeName, 
                    c.name recipeCategoryName, 
                    r.image recipeImage, 
                    us.created_at createdAt, 
                    us.updated_at updatedAt,
                    COUNT(users_steps.id) nSteps, 
                    SUM(CASE WHEN users_steps.status = 'done' THEN 1 ELSE 0 END) nStepsDone
                    FROM users_cooks us 
                    JOIN recipes r 
                    ON us.recipe_id = r.id 
                    JOIN users_histories uh
                    ON uh.user_id = us.user_id
                    AND uh.recipe_id = us.recipe_id
                    JOIN categories c
                    ON c.id = r.category_id
                    JOIN steps
                    ON steps.recipe_id = r.id
                    LEFT JOIN users_steps
                    ON users_steps.user_id = us.user_id
                    AND users_steps.step_id = steps.id
                    LEFT JOIN recipes_reactions ur
                    ON ur.user_id = us.user_id
                    AND ur.recipe_id = us.recipe_id
                    WHERE us.user_id = ? 
                    AND r.category_id IN ?
                    AND uh.status LIKE ?
                    GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9
                    ORDER BY ${sortArray[0]} ${sortArray[1]}
                    LIMIT ?
                    OFFSET ?
                `;

                mySqlCon.query(query, [id, [categories], `%${status}%`, limit, skip], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results) {
                        results.map((result) => {
                            result.nStepsDone = parseInt(result.nStepsDone);
                            return result;
                        });
                        resolve(results);
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async getServesHistoryDetail(id, serveId, categoryId = null, sort = null, limit = 10, skip = 0, status = '') {
        return new Promise((resolve, reject) => {
            try {
                let categories;
                if (categoryId) {
                    categories = [categoryId];
                } else {
                    categories = [1, 2, 3, 4, 5];
                }

                let sortArray;
                switch (sort) {
                    case 'newest':
                        sortArray = ['created_at', 'DESC'];
                        break;
                    case 'oldest':
                        sortArray = ['created_at', 'ASC'];
                        break;
                    case 'nserve_asc':
                        sortArray = ['us.n_of_serving', 'ASC'];
                        break;
                    case 'nserve_desc':
                        sortArray = ['us.n_of_serving', 'DESC'];
                        break;
                    default:
                        sortArray = ['us.created_at', 'DESC'];
                }

                const query = `
                    SELECT us.id, 
                    us.n_of_serving nServing, 
                    ur.reaction,
                    uh.status, 
                    r.id recipeId, 
                    r.name recipeName, 
                    c.name recipeCategoryName, 
                    r.image recipeImage, 
                    us.created_at createdAt, 
                    us.updated_at updatedAt,
                    COUNT(users_steps.id) nSteps, 
                    SUM(CASE WHEN users_steps.status = 'done' THEN 1 ELSE 0 END) nStepsDone
                    FROM users_cooks us 
                    JOIN recipes r 
                    ON us.recipe_id = r.id 
                    JOIN users_histories uh
                    ON uh.user_id = us.user_id
                    AND uh.recipe_id = us.recipe_id
                    JOIN categories c
                    ON c.id = r.category_id
                    JOIN steps
                    ON steps.recipe_id = r.id
                    LEFT JOIN users_steps
                    ON users_steps.user_id = us.user_id
                    AND users_steps.step_id = steps.id
                    LEFT JOIN recipes_reactions ur
                    ON ur.user_id = us.user_id
                    AND ur.recipe_id = us.recipe_id
                    WHERE us.id = ?
                    AND us.user_id = ? 
                    AND r.category_id IN ?
                    AND uh.status LIKE ?
                    GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9
                    ORDER BY ${sortArray[0]} ${sortArray[1]}
                    LIMIT ?
                    OFFSET ?
                `;

                mySqlCon.query(query, [serveId, id, [categories], `%${status}%`, limit, skip], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        results.map((result) => {
                            result.nStepsDone = parseInt(result.nStepsDone);
                            return result;
                        });
                        resolve(results[0]);
                    } else {
                        reject(new NotFoundError(`Serve history with id ${serveId} not found`));
                    }
                });
            } catch (err) {
                if (err.name === 'NotFoundError') {
                    reject(new NotFoundError(err));
                } else {
                    reject(new InvariantError(err));
                }
            }
        });
    }

    async addServeHistory(usersCooks) {
        try {
            const recipeId = await Recipes.findOne({
                attributes: ['id'],
                where: {
                    id: usersCooks.recipe_id,
                },
            });

            if (!recipeId) throw new NotFoundError(`Recipe with id ${usersCooks.recipe_id} not found`);

            const serve = await UsersCooks.create(usersCooks, {
                updateOnDuplicate: ['user_id', 'recipe_id'],
            });
            const userHistory = {
                user_id: usersCooks.user_id,
                recipe_id: usersCooks.recipe_id,
                status: 'progress',
            };
            await UsersHistories.create(userHistory, {
                updateOnDuplicate: ['user_id', 'recipe_id'],
            });
            const recipe = await Recipes.findOne({
                raw: true,
                where: {
                    id: serve.recipe_id,
                },
            });
            const category = await Categories.findOne({
                raw: true,
                where: {
                    id: recipe.category_id,
                },
            });
            const steps = await Steps.findAll({
                raw: true,
                where: {
                    recipe_id: usersCooks.recipe_id,
                },
            });
            const userStep = {
                user_id: usersCooks.user_id,
                step_id: 0,
                status: 'progress',
            };
            for (const step of steps) {
                userStep.step_id = step.id;
                await UsersSteps.create(userStep,
                    {
                        updateOnDuplicate: ['user_id', 'step_id'],
                    },
                );
            }
            const recipesReactions = await RecipesReactions.findOne({
                raw: true,
                attributes: ['reaction'],
                where: {
                    user_id: usersCooks.user_id,
                    recipe_id: usersCooks.recipe_id,
                },
            });

            const response = {
                id: serve.id,
                nServing: serve.n_of_serving,
                recipeId: serve.recipe_id,
                recipeName: recipe.name,
                recipeCategoryName: category.name,
                recipeImage: recipe.image,
                steps: null,
                nStep: steps.length,
                nStepDone: null,
                reactions: recipesReactions ? recipesReactions.reaction : null,
                status: userHistory.status,
                createdAt: serve.createdAt,
                updatedAt: serve.updatedAt,
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

    async getSteps(usersCooks) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    SELECT s.step_order stepOrder, 
                    s.description, 
                    us.status done 
                    FROM users_steps us 
                    JOIN steps s 
                    ON s.id = us.step_id 
                    WHERE us.user_id = ? 
                    AND s.recipe_id = ? 
                    ORDER BY s.step_order ASC
                `;

                mySqlCon.query(query, [usersCooks.user_id, usersCooks.recipe_id], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        results.map((result) => {
                            result.done = result.done == 'progress' ? false : true;
                            return result;
                        });
                        resolve(results);
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {
                reject(reject(new InvariantError(err)));
            }
        });
    }

    async getUserHistory(id, credentialId) {
        try {
            const getHistory = await UsersHistories.findOne({
                raw: true,
                where: {
                    id: id,
                },
            });

            if (!getHistory) throw new NotFoundError(`Serve history with id ${id} not found`);
            if (credentialId != getHistory.user_id) throw new AuthorizationError('Forbidden');

            return getHistory;
        } catch (err) {
            if (err.name === 'NotFoundError') {
                throw new NotFoundError(err);
            } else if (err.name === 'AuthorizationError') {
                throw new AuthorizationError(err);
            } else {
                throw new InvariantError(err);
            }
        }
    }

    async getStepId(recipeId, stepOrder) {
        try {
            const geStepId = await Steps.findOne({
                raw: true,
                attributes: ['id'],
                where: {
                    recipe_id: recipeId,
                    step_order: stepOrder,
                },
            });

            if (!geStepId) throw new NotFoundError('Step id not found');

            return geStepId.id;
        } catch (err) {
            if (err.name === 'NotFoundError') {
                throw new NotFoundError(err);
            } else {
                throw new InvariantError(err);
            }
        }
    }

    async getUserStep(recipeId, credentialId) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    SELECT s.step_order
                    FROM users_steps us
                    JOIN steps s
                    ON us.step_id = s.id
                    WHERE s.recipe_id = ?
                    AND us.user_id = ?
                    AND us.status = ?
                    ORDER BY us.created_at DESC
                    LIMIT 1
                `;

                mySqlCon.query(query, [recipeId, credentialId, 'progress'], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        resolve(results[0].step_order);
                    } else {
                        reject(new InvariantError('User step on progress not found'));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async updateUserStep(credentialId, stepId) {
        try {
            UsersSteps.update({
                status: 'done',
            },
            {
                where: {
                    step_id: stepId,
                    user_id: credentialId,
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

    async updateUserHistoryStatus(credentialId, recipeId, status) {
        try {
            UsersHistories.update({
                status: status,
            },
            {
                where: {
                    user_id: credentialId,
                    recipe_id: recipeId,
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

module.exports = ServeHistoryService;
