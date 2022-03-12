const routes = (handler) => [
    {
        method: 'GET',
        path: '/recipes',
        handler: handler.getRecipesHandler,
    },
    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: handler.getRecipeByIdHandler,
    },
    {
        method: 'GET',
        path: '/recipes/{id}/steps',
        handler: handler.getRecipeStepsByIdHandler,
    },
    {
        method: 'POST',
        path: '/recipes',
        handler: handler.addRecipeHandler,
    },
    {
        method: 'PUT',
        path: '/recipes/{id}',
        handler: handler.updateRecipeHandler,
    },
    {
        method: 'DELETE',
        path: '/recipes/{id}',
        handler: handler.deleteRecipeHandler,
    },
];

module.exports = routes;
