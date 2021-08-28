const CustomError = require('../exeptions/customError');
const { invalidIdReq } = require('../consts/errorMessages');


function checkId(req, res, next) {

    try {
        const { id } = req.params;
        const regEx = /^[a-zA-Z0-9]{24}$/;
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
