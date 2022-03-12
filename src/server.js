require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Jwt = require('@hapi/jwt');

const users = require('./api/users');
const UsersService = require('./services/UsersService');
const UsersValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const categories = require('./api/categories');
const CategoriesService = require('./services/CategoriesService');
const CategoriesValidator = require('./validator/categories');

const recipes = require('./api/recipes');
const RecipesService = require('./services/RecipesService');
const RecipesValidator = require('./validator/recipes');

const search = require('./api/search');
const SearchService = require('./services/SearchService');
const SearchValidator = require('./validator/search');

const init = async () => {
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    const categoriesService = new CategoriesService();
    const recipesService = new RecipesService();
    const searchService = new SearchService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: Jwt,
        },
        {
            plugin: Inert,
        },
    ]);

    server.auth.strategy('code-food-app', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    await server.register([
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: categories,
            options: {
                service: categoriesService,
                validator: CategoriesValidator,
            },
        },
        {
            plugin: recipes,
            options: {
                service: recipesService,
                validator: RecipesValidator,
            },
        },
        {
            plugin: search,
            options: {
                service: searchService,
                validator: SearchValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
