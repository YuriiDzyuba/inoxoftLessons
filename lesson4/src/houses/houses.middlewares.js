const checkPassword = require('../middlewares/checkPassword.middleware');
const checkEmail = require('../middlewares/checkEmail.middleware');
const checkName = require('../middlewares/checkName.middleware');
const checkAge = require('../middlewares/checkAge.middleware');
const checkId = require('../middlewares/checkId.middleware');
const areQueriesEmpty = require('../middlewares/checkReqQuery.middleware');

module.exports = {
    getAllHouses: [areQueriesEmpty],
    getOneHouse: [checkId, areQueriesEmpty],
    addNewHouse: [areQueriesEmpty],
    updateHouse: [checkId, checkName, checkAge, areQueriesEmpty]
};
