const mongoose = require("mongoose")
const Schema = mongoose.Schema

const coursenotesSchema = new Schema({
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

const Coursenotes = mongoose.model("coursenote", coursenotesSchema)
module.exports = Coursenotes