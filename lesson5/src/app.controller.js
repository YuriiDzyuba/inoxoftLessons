const CustomError = require('../exeptions/customError');
const { notFound } = require('../consts/errors');

class AppController {
    getHomePage(req, res) {
        return res.status(301).redirect('/auth');
    }

    notFound() {
        throw new CustomError(notFound.message, notFound.code);
    }
}

module.exports = new AppController();
