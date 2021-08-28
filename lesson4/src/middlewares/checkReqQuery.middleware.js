const CustomError = require('../exeptions/customError');
const { reqQueryNotEmpty } = require('../consts/errorMessages');

function checkReqQueryEmpty(req, res, next) {

    try {

        if (Object.keys(req.query).length){
            throw new CustomError(reqQueryNotEmpty.message, reqQueryNotEmpty.code);
        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkReqQueryEmpty;
