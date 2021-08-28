const checkId = require('../../users/user.midelwares/checkId.middleware');
const areQueriesEmpty = require('../../users/user.midelwares/checkReqQuery.middleware');
const chexkStreet = require('./checkStreet.middleware');
const checkIndex = require('./checkIndex.middleware');

module.exports = {
    getAllHouses: [areQueriesEmpty],
    getOneHouse: [checkId, areQueriesEmpty],
    addNewHouse: [areQueriesEmpty, chexkStreet, checkIndex],
    updateHouse: [checkId, areQueriesEmpty]
};
