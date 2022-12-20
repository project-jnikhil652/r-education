const mongoose = require("mongoose")
const Schema = mongoose.Schema

const featuredcourseSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "course"
    },
}, {
    timestamp: true
})

const Featurecourse = mongoose.model("featuredcourse", featuredcourseSchema)
module.exports = Featurecourse