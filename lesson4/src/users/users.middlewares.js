const checkPassword = require('../middlewares/checkPassword.middleware');
const checkEmail = require('../middlewares/checkEmail.middleware');
const checkName = require('../middlewares/checkName.middleware');
const checkAge = require('../middlewares/checkAge.middleware');
const checkId = require('../middlewares/checkId.middleware');
const areQueriesEmpty = require('../middlewares/checkReqQuery.middleware');

module.exports = {
    getAllUsers: [areQueriesEmpty],
    getOneUser: [checkId, areQueriesEmpty],
    addNewUser: [checkEmail, checkPassword, checkName, checkAge, areQueriesEmpty],
    updateUser: [checkId, checkName, checkAge, areQueriesEmpty]
};
