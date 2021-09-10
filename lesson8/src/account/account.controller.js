const accountService = require('./account.service');
const userService = require('../users/user.service');
const authService = require('../auth/auth.service');
const CustomError = require('../../exeptions/customError');

const { noUser, noActivationLink, cantActivateAccount } = require('../../consts/errors');
const { WELCOME_PAGE, BAN_PAGE, UN_BAN_PAGE } = require('../../consts/emailPageTypes');

const accountController = {
    getActivationLink: async (req, res, next) => {
        try {
            const { currentUser } = req;

            const activationLink = await accountService.addNewActivationLink(currentUser._id.toString());

            await accountService.addNewActivationLink(activationLink, currentUser._id);

            await accountService.sendMail(currentUser.email, WELCOME_PAGE, { activationLink });

            res.json({ message: 'activation link has been sent' });

        } catch (e) {
            next(e);
        }
    },

    activateAccount: async (req, res, next) => {
        try {
            const { link } = req.params;
            const { _id } = req.currentUser;

            const foundLink = await accountService.findActivationLink(link, _id);

            if (!foundLink) throw new CustomError(noActivationLink.message, noActivationLink.code);

            const modifiedUser = await userService.updateUser(_id, { isActivated: true });

            if (!modifiedUser) throw new CustomError(cantActivateAccount.message, cantActivateAccount.code);

            res.json({ message: 'account activated' });

        } catch (e) {
            next(e);
        }
    },

    changeBanStatus: (toBan = true) => async (req, res, next) => {
        try {
            const userId = req.params;

            const modifiedUser = await accountService.modifyUserAccount(userId.id, toBan);

            if (!modifiedUser) throw new CustomError(noUser.message, noUser.code);

            await accountService.sendMail(modifiedUser.email, toBan ? BAN_PAGE : UN_BAN_PAGE);

            await authService.deleteAllTokens({ USER: userId });

            res.json({ message: `user ${modifiedUser.email} has been ${toBan ? 'banned' : 'unbanned'}` });

        } catch (e) {
            next(e);
        }
    },
};

module.exports = accountController;
