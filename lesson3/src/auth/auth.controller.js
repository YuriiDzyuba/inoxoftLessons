const userService = require('../users/users.service');
const authService = require('./auth.service');

const { STATIC_PATH, USER_PATH } = require('../../config');

class AuthController {
    getAuthPage(req, res) {
        try {
            const { error } = req.query;
            res.status(200)
                .render(`${STATIC_PATH}/auth`, { error });
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const isEmailCorrect = await authService.checkEmail(login);

            if (!isEmailCorrect) {
                (res.status(400)
                    .redirect('/auth?error=wrong email'));
                return;
            }

            const users = await userService.getUsers(USER_PATH);

            for (const key in users) {
                if (key === login && users[key].password === password) {
                    res.status(300)
                        .redirect('/users');
                    return;
                }
                if (key === login && users[key].password !== password) {
                    res.status(400)
                        .redirect('/auth?error=wrong password');
                    return;
                }
            }

            res.status(400)
                .redirect(`/auth?error=login: ${login} doesnt exist`);
        } catch (e) {
            console.log(e);
        }
    }

    getRegistrationPage(req, res) {
        try {
            const { error } = req.query;
            res.status(200)
                .render(`${STATIC_PATH}/registration`, { error });
        } catch (e) {
            console.log(e);
        }
    }

    async registration(req, res) {
        try {
            const { login, password, name, age } = req.body;

            if (!authService.checkEmail(login)) {
                res.status(400)
                    .redirect('/registration?error=wrong email');
                return;
            }
            if (!authService.checkPassword(password)) {
                res.status(400)
                    .redirect('/registration?error=wrong password');
                return;
            }
            if (!authService.checkName(name)) {
                res.status(400)
                    .redirect('/registration?error=wrong name');
                return;
            }
            if (!authService.checkAge(age)) {
                res.status(400)
                    .redirect('/registration?error=wrong age');
                return;
            }

            const users = await userService.getUsers(USER_PATH);

            for (const key in users) {
                if (key === login) {
                    res.status(400)
                        .redirect(`/registration?error=user with login: ${login} exists`);
                    return;
                }
            }

            users[login] = {
                name,
                age,
                password,
                id: `${Date.now()}`,
                email: login
            };

            const newUsers = await userService.addUser(USER_PATH, users, users[login].id);

            if (!newUsers) {
                res.status(500)
                    .redirect('/registration?error=something went wrong');
                return;
            }

            res.status(300)
                .redirect('/users');
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController();
