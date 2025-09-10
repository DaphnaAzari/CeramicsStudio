const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    image: {
        url: String,
        filename: String,

    },
    socials: {
        instagram: String,
        website: String

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = model('User', UserSchema);

module.exports = User;