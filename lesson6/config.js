const path = require('path');

module.exports = {
    PORT: process.env.PORT || 5555,
    DB_PATH: process.env.DB_PATH || 'mongodb://localhost:27017/database',
    HASH_SALT: process.env.HASH_SALT || 7,
    USER_PATH: path.join(__dirname, 'src', 'data', 'users.json'),
    STATIC_PATH: path.join(__dirname, 'src', 'static'),

};
