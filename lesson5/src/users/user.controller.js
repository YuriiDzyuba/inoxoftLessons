const userService = require('./user.service');
const CustomError = require('../../exeptions/customError');
const { noUsers, noUser, userExist } = require('../../consts/errorMessages');

class UserController {

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();

            if (!Object.keys(users).length) {
                throw new CustomError(noUsers.message, noUsers.code);
            }

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getOneUser(req, res, next) {
        try {
            const { id } = req.params;

            const chosenUser = await userService.getOneUser(id);

            if (!chosenUser) {
                throw new CustomError(noUser.message, noUser.code);
            }

            res.status(200).json(chosenUser);
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const userData = req.body;

            const updatedUser = await userService.updateUser(id, userData);

            if (!updatedUser) {
                throw new CustomError(noUser.message, noUser.code);
            }

            res.status(200).json(updatedUser);

        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            const deletedUser = await userService.deleteUser(id);

            if (!deletedUser) {
                throw new CustomError(noUser.message, noUser.code);
            }

            res.status(200).json(deletedUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
