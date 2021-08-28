const CustomError = require('../../exeptions/customError');
const { invalidStreet } = require('../../consts/errorMessages');

function checkStreet(req, res, next) {

    try {
        const { street } = req.body;
        const regEx = /^[a-zA-Z]{4,22}$/;
        const testResult = regEx.test(street);

        if (!testResult) {
            throw new CustomError(invalidStreet.message, invalidStreet.code);
        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkStreet;
