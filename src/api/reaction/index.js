const ReactionHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'reaction',
    version: '1.0.0',
    register: async (server, { service, serveService, validator }) => {
        const reactionHandler = new ReactionHandler(service, serveService, validator);
        server.route(routes(reactionHandler));
    },
};
