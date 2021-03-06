const CustomError = require('../../../exeptions/customError');
const { getUserHouseQuery } = require('../house.validators');

module.exports = (req, res, next) => {
    try {
        const { error } = getUserHouseQuery.validate(req.query);

        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }

        next();

    } catch (e) {
        next(e);
    }

};
