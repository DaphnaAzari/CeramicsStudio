const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
    workshopName: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,

    },
    dateAndTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String,

    },
    socials: {
        instagram: String,
        website: String

    }

});

const Workshop = mongoose.model('Workshop', workshopSchema);

// Optional- only if needed elsewhere
module.exports = Workshop;



