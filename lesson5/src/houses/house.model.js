const { Schema, model } = require('mongoose');

const House = new Schema({
    street: {
        type: String,
        required: true,
        trim: true,
    },
    index: {
        type: Number,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: false,
        trim: true,
    },
    isSale: {
        type: Boolean,
        required: true,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

module.exports = model('house', House);
