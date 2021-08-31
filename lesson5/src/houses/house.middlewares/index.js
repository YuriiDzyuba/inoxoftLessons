const checkId = require('../../users/user.middleware/checkId.middleware');
const isQuerieEmpty = require('../../users/user.middleware/isReqQueryEmpty.middleware');
const checkNewHouseInputs = require('./checkCreateNewHouseInputs.middleware');
const checkUpdateHouseInputs = require('./checkUpdateHouseInputs.middleware');
const checkUserIdQuery = require('./checkUpdateHouseInputs.middleware');

module.exports = {
    getAllHouses: [checkUserIdQuery],
    getOneHouse: [checkId, isQuerieEmpty],
    addNewHouse: [checkNewHouseInputs, isQuerieEmpty],
    updateHouse: [checkId, checkUpdateHouseInputs, isQuerieEmpty]
};
