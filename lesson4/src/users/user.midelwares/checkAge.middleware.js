const CustomError = require('../../exeptions/customError');
const { invalidAge } = require('../../consts/errorMessages');

function checkAge(req, res, next) {

    try {
        const { age } = req.body;

        if (age) {
            const regEx = /^100|[1-9]?\d$/;
            const testResult = regEx.test(age);
            console.log(testResult);
            if (!testResult) {
                throw new CustomError(invalidAge.message, invalidAge.code);
            }

        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkAge;
