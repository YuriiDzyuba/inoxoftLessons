const CustomError = require('../exeptions/customError');
const { invalidName } = require('../consts/errorMessages');

function checkName(req, res, next) {

    try {
        const { name } = req.body;

        if (name) {
            const regEx = /^[a-zA-Z]{4,22}$/;
            const testResult = regEx.test(name);

            if (!testResult) {
                throw new CustomError(invalidName.message, invalidName.code);
            }

        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkName;
