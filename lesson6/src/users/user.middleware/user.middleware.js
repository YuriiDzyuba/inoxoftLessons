const CustomError = require('../../../exeptions/customError');
const userService = require('../user.service');

const { noUser } = require('../../../consts/errors');
const { invalidIdReq, forbidden } = require('../../../consts/errors');
const { USER_ID_REGEXP } = require('../../../consts/regExp');
const { updateUserValidator } = require('../user.validators');
const { reqQueryNotEmpty, reqBodyNotEmpty } = require('../../../consts/errors');

const userMiddleware = {
    checkId: (req, res, next) => {
        try {
            const { id } = req.params;
            const regEx = USER_ID_REGEXP;
            const testResult = regEx.test(id);

            if (!testResult) {
                throw new CustomError(invalidIdReq.message, invalidIdReq.code);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const chosenUser = await userService.getOneUser(id);

            if (!chosenUser) {
                throw new CustomError(noUser.message, noUser.code);
            }

            req.user = chosenUser;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUpdateUserInputs: (req, res, next) => {
        try {
            const { error, value } = updateUserValidator.validate(req.body);

            if (error) {
                throw new CustomError(error.details[0].message, 400);
            }

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    isReqQueryEmpty: (req, res, next) => {

        try {
            if (Object.keys(req.query).length) {
                throw new CustomError(reqQueryNotEmpty.message, reqQueryNotEmpty.code);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isReqBodyEmpty: (req, res, next) => {
        console.log(req.body);
        try {
            if (Object.keys(req.body).length) {
                throw new CustomError(reqBodyNotEmpty.message, reqBodyNotEmpty.code);
            }

            next();

        } catch (e) {
            next(e);
        }
    },
    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            console.log(req.user);
            const { role } = req.user;

            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(role)) {
                throw new CustomError(forbidden.message, forbidden.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};

module.exports = userMiddleware;
