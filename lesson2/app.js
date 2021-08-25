const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./configs/env');
const addUser = require('./utils/addUser');
const getUsers = require('./utils/getUsers');
const getOneUser = require('./utils/getOneUser');
const checkFields = require('./utils/checkFields');

const staticPath = path.join(__dirname, 'static');
const usersPath = path.join(__dirname, 'db', 'users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.get('/auth', (req, res) => {
    const { error } = req.query;
    res.status(200)
        .render('auth', { error });
});

app.post('/auth', async (req, res) => {
    const { login, password } = req.body;
    const isEmailCorrect = await checkFields.checkEmail(login);

    if (!isEmailCorrect) {
        (res.status(400)
            .redirect('/auth?error=wrong email'));
        return;
    }

    const users = await getUsers(usersPath);

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
});

app.get('/registration', (req, res) => {
    const { error } = req.query;
    res.status(200)
        .render('registration', { error });
});

app.post('/registration', async (req, res) => {
    const { login, password, name, age } = req.body;

    if (!checkFields.checkEmail(login)) {
        res.status(400)
            .redirect('/registration?error=wrong email');
        return;
    }
    if (!checkFields.checkPassword(password)) {
        res.status(400)
            .redirect('/registration?error=wrong password');
        return;
    }
    if (!checkFields.checkName(name)) {
        res.status(400)
            .redirect('/registration?error=wrong name');
        return;
    }
    if (!checkFields.checkAge(age)) {
        res.status(400)
            .redirect('/registration?error=wrong age');
        return;
    }

    const users = await getUsers(usersPath);

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

    const newUsers = await addUser(usersPath, users, users[login].id);

    if (!newUsers) {
        res.status(500)
            .redirect('/registration?error=something went wrong');
        return;
    }

    res.status(300)
        .redirect('/users');
});

app.get('/users', async (req, res) => {
    const users = await getUsers(usersPath);

    res.status(200)
        .render('users', {
            pageHeader: 'users',
            users
        });
});

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const chosenUser = await getOneUser(usersPath, userId);
    console.log(chosenUser, 'chosenUser');
    if (!chosenUser) {
        res.status(404)
            .redirect('/404');
        return;
    }

    res.status(200)
        .render('user', { chosenUser });
});

app.get('/', (req, res) => {
    res.status(300)
        .redirect('/auth');
});

app.get('*', (req, res) => {
    res.status(404)
        .render('404');
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
