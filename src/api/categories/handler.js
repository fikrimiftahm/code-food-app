const ClientError = require('../../exceptions/ClientError');

class CategoriesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.getCategoriesHandler = this.getCategoriesHandler.bind(this);
        this.addCategoriesHandler = this.addCategoriesHandler.bind(this);
        this.updateCategoriesHandler = this.updateCategoriesHandler.bind(this);
        this.deleteCategoriesHandler = this.deleteCategoriesHandler.bind(this);
    }

    async getCategoriesHandler(request, h) {
        try {
            const categories = await this._service.getCategories();

            const response = h.response({
                success: true,
                message: 'Success',
                data: categories,
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

    async addCategoriesHandler(request, h) {
        try {
            this._validator.validateCategoriesPayload(request.payload);
            const { name } = request.payload;
            const categories = await this._service.addCategories(name);

            const response = h.response({
                success: true,
                message: 'Success',
                data: categories,
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

    async updateCategoriesHandler(request, h) {
        try {
            const { id } = request.params;
            this._validator.validateCategoriesPayload(request.payload);
            const { name } = request.payload;
            const categories = await this._service.updateCategories(name, id);

            const response = h.response({
                success: true,
                message: 'Success',
                data: categories,
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

    async deleteCategoriesHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteCategories(id);

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

module.exports = CategoriesHandler;
