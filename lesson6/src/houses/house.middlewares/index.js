const { isReqQueryEmpty, checkId } = require('../../users/user.middleware/user.middleware');
const { checkUserRole, getUserById } = require('../../users/user.middleware/user.middleware');
const { USER } = require('../../../consts/userRoles');
const {
    checkUpdateHouseInputs,
    checkUserIdQuery,
    checkCreateNewHouseInputs,
    getHousesByDynamicParam
} = require('./house.middleware');

module.exports = {

    getAllHouses: [checkUserIdQuery],
    getHousesByParams: [checkId, getUserById, checkUserRole([USER]), getHousesByDynamicParam()],
    getOneHouse: [checkId, isReqQueryEmpty],
    addNewHouse: [checkCreateNewHouseInputs, isReqQueryEmpty],
    updateHouse: [checkId, checkUpdateHouseInputs, isReqQueryEmpty]

};
