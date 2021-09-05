const { checkToken } = require('../../auth/auth.middleware/auth.middleware');
const {
    getUserById,
    checkId,
    checkUpdateUserInputs,
    isReqQueryEmpty,
    isReqBodyEmpty,
    checkUserRole,
    checkUserPermission
} = require('./user.middleware');

module.exports = {
    checkToken,
    isReqQueryEmpty,
    isReqBodyEmpty,
    checkId,
    getUserById,
    checkUpdateUserInputs,
    checkUserRole,
    checkUserPermission
};
