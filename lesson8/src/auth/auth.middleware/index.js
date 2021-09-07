const { checkRegistrationInputs, checkLoginInputs, isUserEmailExist, checkToken } = require('./auth.middleware');
const { isReqQueryEmpty, isReqBodyEmpty, checkUserRole } = require('../../users/user.middleware/user.middleware');
const { isAccountBanned } = require('../../account/account.middleware');

module.exports = {
    checkToken,
    checkRegistrationInputs,
    isReqQueryEmpty,
    isUserEmailExist,
    checkLoginInputs,
    checkUserRole,
    isReqBodyEmpty,
    isAccountBanned
};
