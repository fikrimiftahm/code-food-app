const routes = (handler) => [
    {
        method: 'GET',
        path: '/recipe-categories',
        handler: handler.getCategoriesHandler,
    },
    {
        method: 'POST',
        path: '/recipe-categories',
        handler: handler.addCategoriesHandler,
    },
    {
        method: 'PUT',
        path: '/recipe-categories/{id}',
        handler: handler.updateCategoriesHandler,
    },
    {
        method: 'DELETE',
        path: '/recipe-categories/{id}',
        handler: handler.deleteCategoriesHandler,
    },
];

module.exports = routes;
