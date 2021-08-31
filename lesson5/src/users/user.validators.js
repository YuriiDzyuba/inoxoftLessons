const Joi = require('joi');
const userRoles = require('../../consts/userRoles');

const { EMAIL_REGEXP, NAME_REGEXP } = require('../../consts/regExp');
const { CURRENT_YEAR, AGE_LIMIT_MAX, AGE_LIMIT_MIN } = require('../../consts/userConsts');

module.exports = {
    updateUserValidator: Joi.object({
        email: Joi.string()
            .regex(EMAIL_REGEXP)
            .trim(),
        name: Joi.string()
            .alphanum()
            .regex(NAME_REGEXP)
            .trim(),
        born_year: Joi.number()
            .integer()
            .min(CURRENT_YEAR - AGE_LIMIT_MAX)
            .max(CURRENT_YEAR - AGE_LIMIT_MIN),
        role: Joi.string()
            .allow(...Object.values(userRoles))
    })
};
