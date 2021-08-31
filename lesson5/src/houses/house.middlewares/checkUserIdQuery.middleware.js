const CustomError = require('../../../exeptions/customError');
const { updateHouse } = require('../house.validators');

module.exports = (req, res, next) => {
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

};
