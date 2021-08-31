const path = require('path');

module.exports = {
    PORT: 5000,
    DB_PATH: 'mongodb://localhost:27017/database',
    USER_PATH: path.join(__dirname, 'src', 'data', 'users.json'),
    STATIC_PATH: path.join(__dirname, 'src', 'static')
};
