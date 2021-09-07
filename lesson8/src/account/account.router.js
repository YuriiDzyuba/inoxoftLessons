const Router = require('express');

const accountController = require('./account.controller');
const accountMiddleware = require('./account.middleware');

const { ADMIN } = require('../../consts/userRoles');

const accountRouter = new Router();

accountRouter.post('/get_link',
    accountMiddleware.isReqQueryEmpty,
    accountMiddleware.isReqBodyEmpty,
    accountMiddleware.checkToken(),
    accountMiddleware.isAccountUnBanned,
    accountMiddleware.isAccountUnActivated,
    accountController.getActivationLink);

accountRouter.post('/activate/:link',
    accountMiddleware.isReqQueryEmpty,
    accountMiddleware.isReqBodyEmpty,
    accountMiddleware.checkToken(),
    accountMiddleware.isAccountUnBanned,
    accountMiddleware.isAccountUnActivated,
    accountController.activateAccount);

accountRouter.post('/ban/:id',
    accountMiddleware.isReqBodyEmpty,
    accountMiddleware.checkToken(),
    accountMiddleware.checkUserRole([ADMIN]),
    accountController.changeBanStatus());

accountRouter.post('/un_ban/:id',
    accountMiddleware.isReqBodyEmpty,
    accountMiddleware.checkToken(),
    accountMiddleware.checkUserRole([ADMIN]),
    accountController.changeBanStatus(false));

module.exports = accountRouter;
