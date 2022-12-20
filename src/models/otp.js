const mongoose = require("mongoose")
const Schema = mongoose.Schema

const otpSchema = new Schema(
    {
        number: {
            type: String
        },
        otp: {
            type: String
        },
        email: {
            type: String
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
            index: { expires: 2000 },
        },
    })

const Otp = mongoose.model("otp", otpSchema)
module.exports = Otp