const CustomError = require('./exeptions/customError');
const { notFound } = require('./consts/errorMessages');


class AppController {
    getHomePage(req, res) {
        return res.status(301).redirect('/auth');
    }

    notFound() {
        throw new CustomError(notFound.code, notFound.message);
    }
}

module.exports = new AppController();
