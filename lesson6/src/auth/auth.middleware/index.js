const { checkRegisterInputs, checkLoginInputs } = require('./auth.middleware');
const { isReqQueryEmpty } = require('../../users/user.middleware/user.middleware');

module.exports = {
    createNewUser: [checkRegisterInputs, isReqQueryEmpty],
    login: [checkLoginInputs, isReqQueryEmpty],
};
