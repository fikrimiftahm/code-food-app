const routes = (handler) => [
    {
        method: 'POST',
        path: '/auth/register',
        handler: handler.postUserHandler,
    },
];

module.exports = routes;
