const mongoose = require('mongoose');
const otpSchema = require('./schemas/otp');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    phone_number: {
        type: String,
        unique: true,
        sparse: true
    },
    country_code: {
        type: String,
        default: "+91"
    },
    provider: {
        type: String,
        enum: ['password', 'google', 'facebook'],
        default: 'password'
    },
    name: {
        type: String,
    },
    user_name: {
        type: String
    },
    image: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    profile_image: {
        type: String,
    },
    otp: {
        type: otpSchema,
        select: false
    },
    access_token: {
        type: String,
    },
    refresh_token: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    status:{
        type:String,
        default:'unblock'
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;