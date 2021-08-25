const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const appRouter = require('./app.router');

const routes = [userRouter, authRouter, appRouter];

const initApi = (app) => routes.forEach((route) => app.use(route));

module.exports = initApi;
