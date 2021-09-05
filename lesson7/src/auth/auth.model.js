const { Schema, model } = require('mongoose');
const { USER, AUTH } = require('../../consts/dbEnums');

const OAuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = model(AUTH, OAuthSchema);
