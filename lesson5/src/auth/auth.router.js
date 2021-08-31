const Router = require('express');

const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');

const authRouter = new Router();

authRouter.post('/registration', authMiddleware.createNewUser, authController.createNewUser);
authRouter.post('/login', authMiddleware.login, authController.login);

module.exports = authRouter;
