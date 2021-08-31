const CustomError = require('../../../exeptions/customError');
const { invalidIdReq } = require('../../../consts/errorMessages');
const { USER_ID_REGEXP } = require('../../../consts/regExp');

function checkId(req, res, next) {

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
}

module.exports = checkId;
