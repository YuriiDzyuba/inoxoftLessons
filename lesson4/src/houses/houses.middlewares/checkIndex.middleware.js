const CustomError = require('../../exeptions/customError');
const { invalidIndexType, invalidIndexValue } = require('../../consts/errorMessages');

function checkIndex(req, res, next) {

    try {
        const { index } = req.body;

        if (typeof index !== 'number') {
            throw new CustomError(invalidIndexType.message, invalidIndexType.code);
        }

        if (index<10000 || index > 99999) {
            throw new CustomError(invalidIndexValue.message, invalidIndexValue.code);
        }

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = checkIndex;
