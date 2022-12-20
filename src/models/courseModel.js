const mongoose = require("mongoose")
const Schema = mongoose.Schema

const courseSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "instructor"
    },
    courseImage: {
        type: String
    },
    courseName: {
        type: String
    },
    instructorName: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    },
    about: [{
        type: {
            totalTiming: String,
            totalVideo: String,
            accessibility: String,
            courseUploaded: String,
            description: String
        },
        default: []
    }],
    // videos: [{
    //     title: {
    //         type: String,
    //     },
    //     url: {
    //         type: String,
    //     },
    //     key: {
    //         type: String,
    //     }
    // }],
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number
    },


}, {
    timestamps: true
})

const Course = mongoose.model("course", courseSchema)
module.exports = Course