const mongoose = require("mongoose")
const Schema = mongoose.Schema

const supportSchema = new Schema({
    address: {
        type: String
    },
    description: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

const Support = mongoose.model("helpandsupport", supportSchema)
module.exports = Support