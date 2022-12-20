const mongoose = require("mongoose")
const Schema = mongoose.Schema

const coursevideoSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "course"
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    key: {
        type: String,
    }
})

const Coursevideo = mongoose.model("coursevideo", coursevideoSchema)
module.exports = Coursevideo