const ClientError = require('../../exceptions/ClientError');
const InvariantError = require('../../exceptions/InvariantError');

class ServeHandler {
    constructor(service, validator, updateValidator) {
        this._service = service;
        this._validator = validator;
        this._updateValidator = updateValidator;

        this.getServesHistoryHandler = this.getServesHistoryHandler.bind(this);
        this.getServesHistoryDetailHandler = this.getServesHistoryDetailHandler.bind(this);
        this.addServeHandler = this.addServeHandler.bind(this);
        this.updateUserStepStatusHandler = this.updateUserStepStatusHandler.bind(this);
    }

    async getServesHistoryHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { categoryId, sort, limit, skip, status } = request.query;

            const serve = await this._service.getServesHistory(credentialId, categoryId, sort, limit, skip, status);

            const responseBody = {
                total: serve.length,
                history: serve,
            };

            const response = h.response({
                success: true,
                message: 'Success',
                data: responseBody,
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 1 ? error.message.split(': ')[1] : error.message,
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

    async getServesHistoryDetailHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { categoryId, sort, limit, skip, status } = request.query;
            const { id: serveId } = request.params;

            const serve = await this._service.getServesHistoryDetail(credentialId, serveId, categoryId, sort, limit, skip, status);

            if (serve) {
                const usersCooks = {
                    user_id: credentialId,
                    recipe_id: serve.recipeId,
                };

                const steps = await this._service.getSteps(usersCooks);
                serve.steps = steps;

                if (serve.nSteps == serve.nStepsDone && serve.status != 'done') {
                    await this._service.updateUserHistoryStatus(credentialId, serve.recipeId, 'need-reaction');
                    serve.status = 'need-reaction';
                }
            }

            const response = h.response({
                success: true,
                message: 'Success',
                data: serve,
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 1 ? error.message.split(': ')[1] : error.message,
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

    async addServeHandler(request, h) {
        try {
            this._validator.validateServePayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { nServing, recipeId } = request.payload;
            const usersCooks = {
                user_id: credentialId,
                recipe_id: recipeId,
                n_of_serving: nServing,
            };

            const addServe = await this._service.addServeHistory(usersCooks);
            const steps = await this._service.getSteps(usersCooks);
            addServe.steps = steps;
            addServe.nStepDone = 0;
            for (const step of steps) {
                if (step.done === true) addServe.nStepDone += 1;
            }

            const response = h.response({
                success: true,
                message: 'Success',
                data: addServe,
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 1 ? error.message.split(': ')[1] : error.message,
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

    async updateUserStepStatusHandler(request, h) {
        try {
            this._updateValidator.validateServePayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { stepOrder } = request.payload;
            const { id } = request.params;

            const history = await this._service.getUserHistory(id, credentialId);
            const stepId = await this._service.getStepId(history.recipe_id, stepOrder);
            const userStep = await this._service.getUserStep(history.recipe_id, credentialId);
            if (userStep < stepOrder) throw new InvariantError(`Some steps before ${stepOrder} is not done yet`);

            await this._service.updateUserStep(credentialId, stepId);

            const serve = await this._service.getServesHistoryDetail(credentialId, history.recipe_id);

            if (serve) {
                const usersCooks = {
                    user_id: credentialId,
                    recipe_id: serve.recipeId,
                };

                const steps = await this._service.getSteps(usersCooks);
                serve.steps = steps;

                if (serve.nSteps == serve.nStepsDone && serve.status != 'done') {
                    await this._service.updateUserHistoryStatus(credentialId, serve.recipeId, 'need-reaction');
                    serve.status = 'need-reaction';
                }

                const response = h.response({
                    success: true,
                    message: 'Success',
                    data: serve,
                });
                response.code(200);
                return response;
            }
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    success: false,
                    message: error.message.split(': ').length > 1 ? error.message.split(': ')[1] : error.message,
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

module.exports = ServeHandler;
