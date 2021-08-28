const Router = require('express');

const housesController = require('./houses.controller');
const housesMiddlewares = require('./houses.middlewares');

const housesRouter = new Router();

housesRouter.get('/houses', housesMiddlewares.getAllHouses, housesController.getAllHouses);

housesRouter.get('/houses/:id', housesMiddlewares.getOneHouse, housesController.getOneHouse);

housesRouter.post('/houses', housesMiddlewares.addNewHouse, housesController.addNewHouse);

housesRouter.patch('/houses/:id', housesMiddlewares.updateHouse, housesController.updateHouse);

housesRouter.delete('/houses/:id', housesMiddlewares.getOneHouse, housesController.deleteHouse);

module.exports = housesRouter;
