const { checkAuthInputs } = require('../auth.validators');
const CustomError = require('../../../exeptions/customError');

module.exports = (req, res, next) => {
    try {
        const { error, value } = checkAuthInputs.validate(req.body);

        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }

        req.body = value;

        next();

    } catch (e) {
        next(e);
    }

};
