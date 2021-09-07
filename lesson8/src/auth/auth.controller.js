const { v4: uuidv4 } = require('uuid');

const authService = require('./auth.service');
const CustomError = require('../../exeptions/customError');
const userNormalizer = require('../../utils/userNormalizer');
const accountService = require('../account/account.service');

const { wrongPassword, noToken } = require('../../consts/errors');
const { AUTHORIZATION } = require('../../consts/auth');
const { WELCOME_PAGE } = require('../../consts/emailPageTypes');

const authController = {
    createNewUser: async (req, res, next) => {
        try {
            const applicantData = req.body;

            const hashedPassword = await authService.hashPassword(applicantData.password);

            const newUser = await authService.addNewUser({
                ...applicantData,
                password: hashedPassword
            });

            const activationLink = uuidv4();

            await accountService.addNewActivationLink(activationLink, newUser._id);

            await accountService.sendMail(newUser.email, WELCOME_PAGE, { activationLink });

            const normalizedUser = userNormalizer(newUser);

            res.json({ user: normalizedUser });

        } catch (e) {
            next(e);
        }
    },

    logIn: async (req, res, next) => {
        try {
            const { currentUser, body: { password } } = req;

            const isPasswordCorrect = await authService.comparePasswords(password, currentUser.password);

            if (!isPasswordCorrect) throw new CustomError(wrongPassword.message, wrongPassword.code);

            const tokenPair = await authService.generateTokenPair();

            await authService.addNewTokenPair(tokenPair, currentUser._id);

            res.json({ tokenPair, user: userNormalizer(currentUser) });

        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const deletedToken = await authService.deleteToken({ accessToken: token });

            if (!deletedToken) throw new CustomError(noToken.message, noToken.code);

            res.json({ message: 'token has been deleted' });

        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const { currentUser } = req;

            const tokenPair = authService.generateTokenPair();

            await authService.refreshTokenPair({ refreshToken }, tokenPair);

            res.json({ tokenPair, user: userNormalizer(currentUser) });

        } catch (e) {
            next(e);
        }
    },

    logOutFromAllDevices: async (req, res, next) => {
        try {
            const { currentUser } = req;

            const deletedTokens = await authService.deleteAllTokens({ USER: currentUser._id });

            if (!deletedTokens) throw new CustomError(noToken.message, noToken.code);

            res.json({ message: 'all tokens has been deleted' });

        } catch (e) {
            next(e);
        }
    },
};

module.exports = authController;
