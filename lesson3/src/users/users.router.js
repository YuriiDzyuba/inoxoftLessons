const Router = require('express');

const usersController = require('./users.controller');

const usersRouter = new Router();

usersRouter.get('/users', usersController.getAllUsers);
usersRouter.get('/users/:userId', usersController.getOneUser);

module.exports = usersRouter;
