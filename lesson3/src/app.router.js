const Router = require('express');
const appController = require('./app.controller');

const appRouter = new Router();

appRouter.get('/', appController.getHomePage);
appRouter.get('*', appController.get404Page);

module.exports = appRouter;
