const { Schema, model } = require('mongoose');
const { ADMIN, USER } = require('../consts/userRoles');

const User = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: false,
        trim: true,
    },
    age: {
        type: String,
        required: false,
        trim: true,
    },
    role: {
        type: String,
        enum: [
            ADMIN,
            USER
        ],
        default: 'user'
    }
}, { timestamps: true });

module.exports = model('user', User);
