const ServeHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'serve',
    version: '1.0.0',
    register: async (server, { service, validator, updateValidator }) => {
        const serveHandler = new ServeHandler(service, validator, updateValidator);
        server.route(routes(serveHandler));
    },
};
