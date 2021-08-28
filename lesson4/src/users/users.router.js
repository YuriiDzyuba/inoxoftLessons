const Router = require('express');

const usersController = require('./users.controller');
const userMiddlewares = require('./user.midelwares');

const usersRouter = new Router();

usersRouter.get('/users', userMiddlewares.getAllUsers, usersController.getAllUsers);

usersRouter.get('/users/:id', userMiddlewares.getOneUser, usersController.getOneUser);

usersRouter.post('/users', userMiddlewares.addNewUser, usersController.addNewUser);

usersRouter.patch('/users/:id', userMiddlewares.updateUser, usersController.updateUser);

usersRouter.delete('/users/:id', userMiddlewares.getOneUser, usersController.deleteUser);

module.exports = usersRouter;
