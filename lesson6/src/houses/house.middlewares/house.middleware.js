const CustomError = require('../../../exeptions/customError');
const { createNewHouse, getUserHouseQuery, updateHouse } = require('../house.validators');
const { noQueries, cantFindHouses } = require('../../../consts/errors');
const houseService = require('../house.service');

const houseMiddleware = {
    checkCreateNewHouseInputs: (req, res, next) => {
        try {
            const { error, value } = createNewHouse.validate(req.body);

            if (error) {
                throw new CustomError(error.details[0].message, 400);
            }

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUpdateHouseInputs: (req, res, next) => {
        try {
            const { error } = getUserHouseQuery.validate(req.query);

            if (error) {
                throw new CustomError(error.details[0].message, 400);
            }

            next();

        } catch (e) {
            next(e);
        }

    },

    checkUserIdQuery: (req, res, next) => {
        try {
            const { error, value } = updateHouse.validate(req.body);

            if (error) {
                throw new CustomError(error.details[0].message, 400);
            }

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },
    getHousesByDynamicParam: (searchIn = 'query') => async (req, res, next) => {
        try {
            const values = {};
            const params = req[searchIn];

            for (const param in params) {

                switch (param) {
                    case 'index':
                    case 'price':
                        values[param] = +params[param];
                        break;
                    case 'isSale':
                        values[param] = Boolean(params[param] !== 'false');
                        break;
                    case 'street':
                    case 'user':
                        values[param] = params[param];
                        break;
                    default:
                        break;
                }
            }

            if (!Object.keys(values).length) {
                throw new CustomError(noQueries.message, noQueries.code);
            }

            const chosenHouses = await houseService.getHousesByDynamicParam(values);

            if (!chosenHouses.length) {
                throw new CustomError(cantFindHouses.message, cantFindHouses.code);
            }

            req.chosenHouses = chosenHouses;

            next();

        } catch (e) {

            next(e);
        }
    }
};

module.exports = houseMiddleware;
