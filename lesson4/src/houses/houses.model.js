const { Schema, model } = require('mongoose');

const House = new Schema({
    street: {
        type: String,
        required: true,
        trim: true,
    },
    index: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: false
    },
    isSale: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

module.exports = model('house', House);
