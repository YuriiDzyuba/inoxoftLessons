const path = require('path');

module.exports = {
    PORT: process.env.PORT || 5555,
    DB_PATH: process.env.DB_PATH || 'mongodb://localhost:27017/database',
    HASH_SALT: 7,
    USER_PATH: path.join(__dirname, 'src', 'data', 'users.json'),
    STATIC_PATH: path.join(__dirname, 'src', 'static'),
    ACCESS_TOKEN_SECRET: 'ehggfhshdyjyhfbgSnsgnfnggngfbn',
    REFRESH_TOKEN_SECRET: 'ehggfhdsdsd65756yjyhSDgdht45y6rjjdnfn89tfhhdgnfnggngfbn',
    ACCESS_TOKEN_EXP_IN: '15m',
    REFRESH_TOKEN_EXP_IN: '31d',

};
