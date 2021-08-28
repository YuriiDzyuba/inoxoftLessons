const CustomError = require('../../exeptions/customError');
const { invalidPassword } = require('../../consts/errorMessages');

function checkPassword(req, res, next) {

    try {
        const { password } = req.body;
        const regEx = /^[a-zA-Z0-9]{4,23}$/;
        const testResult = regEx.test(password);

        if (!testResult) {
            throw new CustomError(invalidPassword.message, invalidPassword.code);
        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkPassword;
