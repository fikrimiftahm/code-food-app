const ClientError = require('../../exceptions/ClientError');
const bcrypt = require('bcrypt');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postUserHandler.bind(this);
    }

    async postUserHandler(request, h) {
        try {
            this._validator.validateUserPayload(request.payload);

            const { username, password } = request.payload;

            await this._service.verifyNewUsername(username);
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await this._service.addUser({ username, hashedPassword });

            const response = h.response({
                success: true,
                message: 'Success',
                data: {
                    id: userId.id,
                    username: userId.username,
                },
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
}

module.exports = UsersHandler;
