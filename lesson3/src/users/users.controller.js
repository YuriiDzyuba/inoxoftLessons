const { USER_PATH, STATIC_PATH } = require('../../config');
const userService = require('./users.service');

class UsersController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getUsers(USER_PATH);
            res.status(200)
                .render(`${STATIC_PATH}/users`, {
                    pageHeader: 'users',
                    users
                });
        } catch (e) {
            console.log(e);
        }
    }

    async getOneUser(req, res) {
        try {
            const { userId } = req.params;
            const chosenUser = await userService.getOneUser(USER_PATH, userId);

            if (!chosenUser) {
                return res.status(404)
                    .redirect('/404');
            }

            res.status(200)
                .render(`${STATIC_PATH}/user`, { chosenUser });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UsersController();
