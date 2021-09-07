const Router = require('express');

const usersController = require('./user.controller');
const userMiddleware = require('./user.middleware');

const userRouter = new Router();

userRouter.get('/',
    userMiddleware.isReqBodyEmpty,
    usersController.getAllUsers());

userRouter.get('/:id',
    userMiddleware.checkId,
    userMiddleware.isReqBodyEmpty,
    userMiddleware.getUserById,
    usersController.getOneUser(['createdAt', 'updatedAt']));

userRouter.patch('/:id',
    userMiddleware.checkId,
    userMiddleware.checkToken(),
    userMiddleware.checkUserPermission,
    usersController.updateUser);

userRouter.delete('/:id',
    userMiddleware.checkId,
    userMiddleware.checkToken(),
    userMiddleware.getUserById,
    userMiddleware.checkUserPermission,
    usersController.deleteUser);

module.exports = userRouter;
