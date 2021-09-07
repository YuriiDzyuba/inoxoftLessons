const Router = require('express');

const userRoles = require('../../consts/userRoles');
const tokenType = require('../../consts/tokenTypes')
const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');

const authRouter = new Router();

authRouter.post('/registration',
    authMiddleware.isReqQueryEmpty,
    authMiddleware.checkRegistrationInputs,
    authMiddleware.isUserEmailExist(true),
    authController.createNewUser);

authRouter.post('/login',
    authMiddleware.isReqQueryEmpty,
    authMiddleware.checkLoginInputs,
    authMiddleware.isUserEmailExist(false),
    authMiddleware.isAccountBanned,
    authMiddleware.checkUserRole(Object.values(userRoles)),
    authController.logIn);

authRouter.post('/logout',
    authMiddleware.isReqQueryEmpty,
    authMiddleware.isReqBodyEmpty,
    authMiddleware.checkToken(),
    authController.logOut);

authRouter.post('/logout/all',
    authMiddleware.isReqQueryEmpty,
    authMiddleware.isReqBodyEmpty,
    authMiddleware.checkToken(),
    authController.logOutFromAllDevices);

authRouter.post('/refresh',
    authMiddleware.isReqQueryEmpty,
    authMiddleware.isReqBodyEmpty,
    authMiddleware.checkToken(tokenType.REFRESH),
    authController.refreshTokens);

module.exports = authRouter;
