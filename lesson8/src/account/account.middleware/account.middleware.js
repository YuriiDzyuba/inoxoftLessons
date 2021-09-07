const CustomError = require('../../../exeptions/customError');
const { accountActivated, accountUnActivated, accountBanned, accountUnbanned } = require('../../../consts/errors');


const accountMiddleware = {
    isAccountActivated: (req, res, next) => {
        try {
            const { currentUser } = req;

            if (currentUser.isActivated) throw new CustomError(accountUnActivated.message, accountActivated.code);

            next();

        } catch (e) {
            next(e);
        }
    },

    isAccountUnActivated: (req, res, next) => {
        try {
            const { currentUser } = req;

            if (currentUser.isActivated) throw new CustomError(accountActivated.message, accountActivated.code);

            next();

        } catch (e) {
            next(e);
        }
    },

    isAccountBanned: (req, res, next) => {
        try {
            const { currentUser } = req;

            if (currentUser.isBanned) throw new CustomError(accountUnbanned.message, accountUnbanned.code);

            next();

        } catch (e) {
            next(e);
        }
    },

    isAccountUnBanned: (req, res, next) => {
        try {
            const { currentUser } = req;

            if (currentUser.isBanned) throw new CustomError(accountBanned.message, accountUnbanned.code);

            next();

        } catch (e) {
            next(e);
        }
    },
};

module.exports = accountMiddleware;
