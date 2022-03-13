const routes = (handler) => [
    {
        method: 'GET',
        path: '/serve-histories',
        handler: handler.getServesHistoryHandler,
        options: {
            auth: 'code-food-app',
        },
    },
    {
        method: 'GET',
        path: '/serve-histories/{id}',
        handler: handler.getServesHistoryDetailHandler,
        options: {
            auth: 'code-food-app',
        },
    },
    {
        method: 'POST',
        path: '/serve-histories',
        handler: handler.addServeHandler,
        options: {
            auth: 'code-food-app',
        },
    },
    {
        method: 'PUT',
        path: '/serve-histories/{id}/done-step',
        handler: handler.updateUserStepStatusHandler,
        options: {
            auth: 'code-food-app',
        },
    },
];

module.exports = routes;
