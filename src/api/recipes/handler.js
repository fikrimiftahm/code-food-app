const ClientError = require('../../exceptions/ClientError');

class RecipesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.getRecipesHandler = this.getRecipesHandler.bind(this);
        this.getRecipeByIdHandler = this.getRecipeByIdHandler.bind(this);
        this.getRecipeStepsByIdHandler = this.getRecipeStepsByIdHandler.bind(this);
        this.addRecipeHandler = this.addRecipeHandler.bind(this);
        this.updateRecipeHandler = this.updateRecipeHandler.bind(this);
        this.deleteRecipeHandler = this.deleteRecipeHandler.bind(this);
    }

    async getRecipesHandler(request, h) {
        try {
            const recipes = await this._service.getRecipes();

            const response = h.response({
                success: true,
                message: 'Success',
                data: recipes,
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                success: false,
                message: 'Server error',
            });
            response.code(500);
            return response;
        }
    }

    async getRecipeByIdHandler(request, h) {
        try {
            const id = request.params.id;
            const nServing = request.query.nServing ? parseInt(request.query.nServing) : 1;
            const recipe = await this._service.getRecipeById(id, nServing);

            const response = h.response({
                success: true,
                message: 'Success',
                data: recipe,
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 0 ? error.message.split(': ')[1] : error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                success: false,
                message: 'Server error',
            });
            response.code(500);
            return response;
        }
    }

    async getRecipeStepsByIdHandler(request, h) {
        try {
            const id = request.params.id;
            const recipeSteps = await this._service.getRecipeStepsById(id);

            const response = h.response({
                success: true,
                message: 'Success',
                data: recipeSteps,
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ')[1],
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                success: false,
                message: 'Server error',
            });
            response.code(500);
            return response;
        }
    }

    async addRecipeHandler(request, h) {
        try {
            this._validator.validateRecipePayload(request.payload);
            const {
                name,
                recipeCategoryId,
                image,
                nServing = 1,
                ingredientsPerServing,
                steps,
            } = request.payload;

            const recipe = {
                category_id: recipeCategoryId,
                name: name,
                image: image,
            };

            const recipes = await this._service.addRecipes(recipe, steps, ingredientsPerServing, nServing);

            const response = h.response({
                success: true,
                message: 'Success',
                data: recipes,
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                success: false,
                message: 'Server error',
            });
            response.code(500);
            return response;
        }
    }

    async updateRecipeHandler(request, h) {
        try {
            const id = request.params.id;
            this._validator.validateRecipePayload(request.payload);
            const {
                name,
                recipeCategoryId,
                image,
                nServing = 1,
                ingredientsPerServing,
                steps,
            } = request.payload;

            const recipe = {
                category_id: recipeCategoryId,
                name: name,
                image: image,
            };

            const recipes = await this._service.updateRecipes(id, recipe, steps, ingredientsPerServing, nServing);

            const response = h.response({
                success: true,
                message: 'Success',
                data: recipes,
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 0 ? error.message.split(': ')[1] : error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                success: false,
                message: 'Server error',
            });
            response.code(500);
            return response;
        }
    }

    async deleteRecipeHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteRecipe(id);

            const response = h.response({
                success: true,
                message: 'Success',
                data: {},
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 0 ? error.message.split(': ')[1] : error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                success: false,
                message: 'Server error',
            });
            response.code(500);
            return response;
        }
    }
}

module.exports = RecipesHandler;
