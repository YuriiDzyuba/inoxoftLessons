const CustomError = require('../exeptions/customError');
const { noUsers, noUser, userExist } = require('../consts/errorMessages');

function checkEmail(req, res, next) {
    try {

    } catch (e) {
        throw CustomError();
    }
}

module.exports = checkEmail;
