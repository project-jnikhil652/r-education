const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "course"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    price: {
        type: String
    },
    date: {
        type: String
    },
    orderId: {
        type: String
    },
    totalamount: {
        type: String
    }
}, {
    timestamps: true
})

const Cart = mongoose.model("cart", cartSchema)
module.exports = Cart