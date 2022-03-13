const routes = (handler) => [
    {
        method: 'POST',
        path: '/serve-histories/{id}/reaction',
        handler: handler.addReactionHandler,
        options: {
            auth: 'code-food-app',
        },
    },
];

module.exports = routes;
