const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { Schema } = mongoose;

// Sub-schema for socials (no separate _id)
const socialsSchema = new Schema({
    instagram: { type: String, default: '' },
    website: { type: String, default: '' }
}, { _id: false });

// Main User schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    image: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: { type: String, required: true, select: false },
    socials: { type: socialsSchema, default: () => ({}) }
}, { timestamps: true });

// Hash password before saving (only if modified)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords when logging in
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;




//

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Schema = mongoose.Schema;
// const validator = require('validator');

// const userSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     userName: {
//         type: String,
//         required: true
//     },
//     image: {
//         url: { type: String, default: '' },
//         public_id: { type: String, default: '' }

//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         lowercase: true,
//         validate: [validator.isEmail, 'Please provide a valid email address']
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false

//     },
//     socials: {
//         instagram: { type: String, default: '' },
//         website: { type: String, default: '' }

//     }
// });


// // will only hash if changed
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // compares passwords when loggingin
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };


// const User = mongoose.model('User', userSchema);

// // only if needed elsewhere
// module.exports = User;
