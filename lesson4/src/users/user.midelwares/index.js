const checkPassword = require('./checkPassword.middleware');
const checkEmail = require('./checkEmail.middleware');
const checkName = require('./checkName.middleware');
const checkAge = require('./checkAge.middleware');
const checkId = require('./checkId.middleware');
const areQueriesEmpty = require('./checkReqQuery.middleware');

module.exports = {
    getAllUsers: [areQueriesEmpty],
    getOneUser: [checkId, areQueriesEmpty],
    addNewUser: [checkEmail, checkPassword, checkName, checkAge, areQueriesEmpty],
    updateUser: [checkId, checkName, checkAge, areQueriesEmpty]
};
