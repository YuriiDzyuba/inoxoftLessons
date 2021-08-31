const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/user.router');
const housesRouter = require('./houses/house.router');
const appController = require('./app.controller');

module.exports = (app) => {

    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/houses', housesRouter);

    app.get('/', appController.getHomePage);
    app.get('*', appController.notFound);
    app.post('*', appController.notFound);

};
