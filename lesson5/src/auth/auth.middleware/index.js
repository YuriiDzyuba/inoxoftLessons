const checkRegisterInputs = require('./checkRegistrInputs.middleware');
const checkLoginInputs = require('./checkLoginInputs.middleware');
const isReqQueryEmpty = require('../../users/user.middleware/isReqQueryEmpty.middleware');

module.exports = {
    createNewUser: [checkRegisterInputs, isReqQueryEmpty],
    login: [checkLoginInputs, isReqQueryEmpty],
};
