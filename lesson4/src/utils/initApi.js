const usersRouter = require('../users/users.router');
const housesRouter = require('../houses/houses.router');
const appRouter = require('../app.router');

const routes = [usersRouter, housesRouter, appRouter];

const initApi = (app) => routes.forEach((route) => app.use(route));

module.exports = initApi;
