const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    notification: {
        type: String
    }
}, {
    timestamps: true
})

const Notification = mongoose.model("notification", notificationSchema)
module.exports = Notification