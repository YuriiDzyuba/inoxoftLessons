const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Auth = require('./auth.model');
const User = require('../users/user.model');
const dbEnums = require('../../consts/dbEnums');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXP_IN, REFRESH_TOKEN_EXP_IN } = require('../../config');
const { HASH_SALT } = require('../../config');

const authService = {
    checkEmail: async (email) => {
        const existingEmail = await User.findOne({ email });
        return existingEmail;
    },

    addNewUser: async (applicantData) => {
        const newUser = await User.create(applicantData);
        return newUser;
    },

    hashPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, HASH_SALT);
        return hashedPassword;
    },

    comparePasswords: async (applicantPassword, userPassword) => {
        const isEqual = await bcrypt.compare(applicantPassword, userPassword);
        return isEqual;
    },

    generateTokenPair: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXP_IN });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXP_IN });

        return { accessToken, refreshToken };
    },

    verifyToken: (token, tokenType = 'access') => {
        const secret = tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
        jwt.verify(token, secret);
    },

    addNewTokenPair: async (tokenPair, userId) => {
        const newAuthToken = await Auth.create({
            ...tokenPair,
            user: userId
        });
        return newAuthToken;
    },

    findToken: async (token) => {
        const savedToken = await Auth.findOne(token).populate(dbEnums.USER);
        return savedToken;
    },

    deleteToken: async (token) => {
        const deletedToken = await Auth.findOneAndDelete(token);
        return deletedToken;
    },

    deleteAllTokens: async (key) => {
        const deletedTokens = await Auth.deleteMany(key);
        return deletedTokens.deletedCount;
    },

    refreshTokenPair: async (oldToken, newTokenPair) => {
        const deletedTokens = await Auth.findOneAndUpdate(oldToken, newTokenPair);
        return deletedTokens;
    }
};

module.exports = authService;
