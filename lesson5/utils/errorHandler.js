const { serverErr } = require('../consts/errorMessages');

// eslint-disable-next-line no-unused-vars
function errHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || serverErr
        });
}

module.exports = errHandler;
