const routes = (handler) => [
    {
        method: 'GET',
        path: '/search/recipes',
        handler: handler.searchRecipesHandler,
    },
];

module.exports = routes;
