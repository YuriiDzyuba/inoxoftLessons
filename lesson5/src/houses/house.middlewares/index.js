const checkId = require('../../users/user.middleware/checkId.middleware');
const isQuerieEmpty = require('../../users/user.middleware/isReqQueryEmpty.middleware');
const checkNewHouseInputs = require('./checkCreateNewHouseInputs.middleware');
const checkUpdateHouseInputs = require('./checkUpdateHouseInputs.middleware');

module.exports = {
    getAllHouses: [isQuerieEmpty],
    getOneHouse: [checkId, isQuerieEmpty],
    addNewHouse: [isQuerieEmpty, checkNewHouseInputs],
    updateHouse: [checkId, isQuerieEmpty, checkUpdateHouseInputs]
};
