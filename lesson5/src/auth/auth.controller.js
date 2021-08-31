const bcrypt = require('bcrypt');

const userService = require('./auth.service');
const CustomError = require('../../exeptions/customError');
const { noUser, userExist, invalidPassword } = require('../../consts/errorMessages');

class AuthController {

    async createNewUser(req, res, next) {
        try {
            const applicantData = req.body;

            const isEmailAvailable = await userService.checkEmail(applicantData.email);

            if (isEmailAvailable) {
                throw new CustomError(userExist.message, userExist.code);
            }

            const hashedPassword = await bcrypt.hash(applicantData.password, 7);

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
                born_year: user.born_year
            });

        } catch (e) {
            next(e);
        }
    }

}

module.exports = new AuthController();
