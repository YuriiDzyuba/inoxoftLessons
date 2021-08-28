const Router = require('express');

const appController = require('./app.controller');

const appRouter = new Router();

appRouter.get('/', appController.getHomePage);
appRouter.get('*', appController.notFound);
appRouter.post('*', appController.notFound);

module.exports = appRouter;
