const ClientError = require('../../exceptions/ClientError');

class SearchHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.searchRecipesHandler = this.searchRecipesHandler.bind(this);
    }

    async searchRecipesHandler(request, h) {
        try {
            this._validator.validateSearchPayload(request.query);

            const { limit, q } = request.query;

            const searchResult = await this._service.searchRecipes(limit, q);

            const response = h.response({
                success: true,
                message: 'Success',
                data: searchResult,
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
}

module.exports = SearchHandler;
