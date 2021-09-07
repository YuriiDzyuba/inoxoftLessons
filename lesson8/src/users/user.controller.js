const userService = require('./user.service');
const CustomError = require('../../exeptions/customError');
const userNormalizer = require('../../utils/userNormalizer');
const { noUsers, noUser } = require('../../consts/errors');

const userController = {
    getAllUsers: (fieldsToRemove) => async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(fieldsToRemove);

            if (!Object.keys(users).length) throw new CustomError(noUsers.message, noUsers.code);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: (fieldsToRemove) => (req, res, next) => {
        try {
            const { user } = req;

            res.json(userNormalizer(user, fieldsToRemove));

        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userData = req.body;

            const updatedUser = await userService.updateUser(id, userData);

            if (!updatedUser) throw new CustomError(noUser.message, noUser.code);

            res.json(updatedUser);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const deletedUser = await userService.deleteUser(id);

            if (!deletedUser) throw new CustomError(noUser.message, noUser.code);

            res.json({ message: `user ${deletedUser.email} has been deleted` });

        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;
