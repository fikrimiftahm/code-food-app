const ClientError = require('../../exceptions/ClientError');
const InvariantError = require('../../exceptions/InvariantError');

class ReactionHandler {
    constructor(service, serveService, validator) {
        this._service = service;
        this._serveService = serveService;
        this._validator = validator;

        this.addReactionHandler = this.addReactionHandler.bind(this);
    }

    async addReactionHandler(request, h) {
        try {
            this._validator.validateReactionPayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { id: serveId } = request.params;
            const { reaction } = request.payload;

            const recipeId = await this._serveService.getUserHistory(serveId, credentialId);

            if (recipeId.status != 'need-reaction') throw new InvariantError(`Invalid status, status need to be need-reaction`);

            const reactionObject = {
                user_id: credentialId,
                recipe_id: recipeId.recipe_id,
                reaction: reaction,
            };

            await this._service.addReaction(reactionObject);

            await this._serveService.updateUserHistoryStatus(credentialId, recipeId.recipe_id, 'done');

            const serve = await this._serveService.getServesHistoryDetail(credentialId, recipeId.recipe_id);

            if (serve) {
                const usersCooks = {
                    user_id: credentialId,
                    recipe_id: serve.recipeId,
                };

                const steps = await this._serveService.getSteps(usersCooks);
                serve.steps = steps;

                if (serve.nSteps == serve.nStepsDone) {
                    await this._serveService.updateUserHistoryStatus(credentialId, serve.recipeId, 'done');
                    serve.status = 'done';
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

module.exports = ReactionHandler;
