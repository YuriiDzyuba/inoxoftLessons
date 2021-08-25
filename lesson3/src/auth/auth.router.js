const Router = require('express');

const authController = require('./auth.controller');

const authRouter = new Router();

authRouter.get('/auth', authController.getAuthPage);
authRouter.post('/auth', authController.login);
authRouter.get('/registration', authController.getRegistrationPage);
authRouter.post('/registration', authController.registration);

module.exports = authRouter;
