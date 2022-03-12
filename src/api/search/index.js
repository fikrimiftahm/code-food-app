const SearchHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'search',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const searchHandler = new SearchHandler(service, validator);
        server.route(routes(searchHandler));
    },
};
