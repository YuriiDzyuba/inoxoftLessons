const Joi = require('joi');
const userRoles = require('../../consts/userRoles');

const { PASSWORD_REGEXP, EMAIL_REGEXP, NAME_REGEXP } = require('../../consts/regExp');
const {
    CURRENT_YEAR,
    AGE_LIMIT_MAX,
    AGE_LIMIT_MIN,
    PASSWORD_LENGTH_MAX,
    PASSWORD_LENGTH_MIN
} = require('../../consts/userConsts');

module.exports = {
    createNewUserValidator: Joi.object({
        email: Joi.string()
            .regex(EMAIL_REGEXP)
            .trim()
            .required(),
        name: Joi.string()
            .alphanum()
            .regex(NAME_REGEXP)
            .trim()
            .required(),
        born_year: Joi.number()
            .integer()
            .min(CURRENT_YEAR - AGE_LIMIT_MAX)
            .max(CURRENT_YEAR - AGE_LIMIT_MIN),
        password: Joi.string()
            .regex(PASSWORD_REGEXP)
            .trim()
            .min(PASSWORD_LENGTH_MIN)
            .max(PASSWORD_LENGTH_MAX)
            .required(),
        role: Joi.string()
            .allow(...Object.values(userRoles))
    }),
    checkAuthInputs: Joi.object({
        email: Joi.string()
            .regex(EMAIL_REGEXP)
            .trim()
            .required(),
        password: Joi.string()
            .regex(PASSWORD_REGEXP)
            .trim()
            .min(PASSWORD_LENGTH_MIN)
            .max(PASSWORD_LENGTH_MAX)
            .required(),
    })
};
