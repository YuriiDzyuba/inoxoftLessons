const checkId = require('./checkId.middleware');
const isReqQueryEmpty = require('./isReqQueryEmpty.middleware');
const checkInputs = require('./checkUpdateUserInputs.middleware');

module.exports = {
    getAllUsers: [isReqQueryEmpty],
    getOneUser: [checkId, isReqQueryEmpty],
    updateUser: [checkInputs, checkId, isReqQueryEmpty]
};
