const routes = (handler) => [
    {
        method: 'POST',
        path: '/auth/login',
        handler: handler.postAuthenticationHandler,
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: handler.putAuthenticationHandler,
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: handler.deleteAuthenticationHandler,
    },
];

module.exports = routes;
