const { STATIC_PATH } = require('../config');

class AppController {
    getHomePage(req, res) {
        return res.status(300).redirect('/auth');
    }

    get404Page(req, res) {
        return res.status(404).render(`${STATIC_PATH}/404`);
    }
}

module.exports = new AppController();
