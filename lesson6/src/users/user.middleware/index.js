const { getUserById, checkId, checkUpdateUserInputs, isReqQueryEmpty, checkUserRole, isReqBodyEmpty } = require('./user.middleware');
const { ADMIN, USER } = require('../../../consts/userRoles');

module.exports = {
    common: [isReqQueryEmpty],
    getAllUsers: [isReqBodyEmpty],
    getOneUser: [checkId, getUserById, checkUserRole([ADMIN, USER])],
    updateUser: [checkId, checkUpdateUserInputs]
};
