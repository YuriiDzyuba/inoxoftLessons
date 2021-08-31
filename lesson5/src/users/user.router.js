const Router = require('express');

const usersController = require('./user.controller');
const userMiddleware = require('./user.middleware');

const userRouter = new Router();

userRouter.get('/', userMiddleware.getAllUsers, usersController.getAllUsers);
userRouter.get('/:id', userMiddleware.getOneUser, usersController.getOneUser);
userRouter.patch('/:id', userMiddleware.updateUser, usersController.updateUser);
userRouter.delete('/:id', userMiddleware.getOneUser, usersController.deleteUser);

module.exports = userRouter;
