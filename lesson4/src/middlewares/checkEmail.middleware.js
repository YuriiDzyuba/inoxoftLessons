const CustomError = require('../exeptions/customError');
const { invalidEmail } = require('../consts/errorMessages');

function checkEmail(req, res, next) {

    try {
        const { email } = req.body;
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const testResult = regEx.test(email);

        if (!testResult) {
            throw new CustomError(invalidEmail.message, invalidEmail.code);
        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkEmail;
