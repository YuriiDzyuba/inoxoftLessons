const path = require('path');

module.exports = {
    PORT: 5000,
    USER_PATH: path.join(__dirname, 'src', 'data', 'users.json'),
    STATIC_PATH: path.join(__dirname, 'src', 'static')
};
