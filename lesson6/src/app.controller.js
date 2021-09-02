const CustomError = require('../exeptions/customError');
const { notFound } = require('../consts/errors');

const appController = {
    getHomePage: (req, res) => res.status(301).redirect('/auth'),

    notFound: () => {
        throw new CustomError(notFound.message, notFound.code);
    }
};

module.exports = appController;
