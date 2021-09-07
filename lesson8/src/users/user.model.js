const { Schema, model } = require('mongoose');
const userRoles = require('../../consts/userRoles');
const { USER } = require('../../consts/dbEnums');

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
    born_year: {
        type: String,
        required: false,
        trim: true,
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false,
    },
    isBanned: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    },
}, { timestamps: true });

module.exports = model(USER, User);
