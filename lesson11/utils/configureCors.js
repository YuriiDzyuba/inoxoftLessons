const CustomError = require('../exeptions/customError');

const { FORBIDDEN } = require('../consts/statusCodes');
const { CORS_NOT_ALLOWED } = require('../consts/responseMessages');
const { ALLOWED_ORIGIN } = require('../config');

module.exports = (origin, callback) => {
    const whiteList = ALLOWED_ORIGIN.split(' ');

    if (!origin) return callback(null, true);

    if (!whiteList.includes(origin)) return callback(new CustomError(FORBIDDEN, CORS_NOT_ALLOWED), false);

    return callback(null, true);
};
