const mongoose = require("mongoose")
const Schema = mongoose.Schema

const instructorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    coursename: {
        type: String,
        required: true
    },
    instructor_status:{
        type:String,
        default:"unblock"
    }
},
    {
        timestamps: true
    }
)

const Instructor = mongoose.model("instructor", instructorSchema)
module.exports = Instructor