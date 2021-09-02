const Router = require('express');

const housesController = require('./house.controller');
const housesMiddleware = require('./house.middlewares');

const houseRouter = new Router();

houseRouter.get('/', housesMiddleware.getAllHouses, housesController.getAllHouses);
houseRouter.post('/', housesMiddleware.addNewHouse, housesController.addNewHouse);
houseRouter.get('/params/:id', housesMiddleware.getHousesByParams, housesController.getHousesByParams);
houseRouter.get('/:id', housesMiddleware.getOneHouse, housesController.getOneHouse);
houseRouter.patch('/:id', housesMiddleware.updateHouse, housesController.updateHouse);
houseRouter.delete('/:id', housesMiddleware.getOneHouse, housesController.deleteHouse);

module.exports = houseRouter;
