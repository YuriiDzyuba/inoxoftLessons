const { checkToken } = require('../../auth/auth.middleware/auth.middleware');
const { isReqQueryEmpty, isReqBodyEmpty, checkUserRole } = require('../../users/user.middleware/user.middleware');
const { isAccountActivated, isAccountBanned, isAccountUnActivated, isAccountUnBanned } = require('./account.middleware');

module.exports = {
    isReqQueryEmpty,
    checkUserRole,
    isReqBodyEmpty,
    checkToken,
    isAccountActivated,
    isAccountUnActivated,
    isAccountBanned,
    isAccountUnBanned
};
