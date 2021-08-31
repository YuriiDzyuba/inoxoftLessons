const bcrypt = require('bcrypt');

const userService = require('./auth.service');
const CustomError = require('../../exeptions/customError');
const { HASH_SALT } = require('../../config');
const { noUser, userExist, invalidPassword } = require('../../consts/errors');

class AuthController {

    async createNewUser(req, res, next) {
        try {
            const applicantData = req.body;

            const isEmailExist = await userService.checkEmail(applicantData.email);

            if (isEmailExist) {
                throw new CustomError(userExist.message, userExist.code);
            }

            const hashedPassword = await bcrypt.hash(applicantData.password, HASH_SALT);

            const newUser = await userService.addNewUser({ ...applicantData, password: hashedPassword });

            if (!newUser) {
                throw new CustomError(noUser.message, noUser.code);
            }

            res.json(newUser);

        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const applicantData = req.body;

            const user = await userService.checkEmail(applicantData.email);

            if (!user) {
                throw new CustomError(noUser.message, noUser.code);
            }

            const isPasswordCorrect = await bcrypt.compare(applicantData.password, user.password);

            if (!isPasswordCorrect) {
                throw new CustomError(invalidPassword.message, invalidPassword.code);
            }

            res.json({
                email: user.email,
                name: user.name,
                born_year: user.born_year,
                _id: user._id
            });

        } catch (e) {
            next(e);
        }
    }

}

module.exports = new AuthController();
