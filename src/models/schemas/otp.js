const mongoose = require('mongoose');
const moment = require('moment')
const OTPSchema = new mongoose.Schema({
    magnitude: {
        type: String,
        required: true,
        index: true
    },
    created: {
        type: Date,
        default: moment().utc()
    },
    type: {
        type: String,
        enum: ['registration', 'password_reset', 'login']
    }
}, {
    _id: false
});

module.exports = OTPSchema;