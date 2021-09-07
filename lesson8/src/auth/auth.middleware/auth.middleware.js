const tokenTypes = require('../../../consts/tokenTypes');
const authService = require('../auth.service');
const CustomError = require('../../../exeptions/customError');

const { checkAuthInputs, createNewUserValidator } = require('../auth.validators');
const { emailExist, userExist, unauthorized } = require('../../../consts/errors');
const { AUTHORIZATION } = require('../../../consts/auth');

const authMiddleware = {
    checkLoginInputs: (req, res, next) => {
        try {
            const { error, value } = checkAuthInputs.validate(req.body);

            if (error) throw new CustomError(error.details[0].message, 400);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkRegistrationInputs: (req, res, next) => {
        try {
            const { error, value } = createNewUserValidator.validate(req.body);

            if (error) throw new CustomError(error.details[0].message, 400);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    isUserEmailExist: (addNewEmail = false) => async (req, res, next) => {
        try {
            const applicantData = req.body;

            const user = await authService.checkEmail(applicantData.email);

            if (user && addNewEmail) throw new CustomError(emailExist.message, emailExist.code);

            if (!user && !addNewEmail) throw new CustomError(userExist.message, userExist.code);

            req.currentUser = user;
            next();

        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType = tokenTypes.ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            if (!token) throw new CustomError(unauthorized.message, unauthorized.code);

            try {
                await authService.verifyToken(token, tokenType);

            } catch (e) {
                throw new CustomError(unauthorized.message, unauthorized.code);
            }

            const savedToken = await authService.findToken({ [`${tokenType}Token`]: token });

            if (!savedToken) throw new CustomError(unauthorized.message, unauthorized.code);

            req.currentUser = savedToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },

};

module.exports = authMiddleware;
