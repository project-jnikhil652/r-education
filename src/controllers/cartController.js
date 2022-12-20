const { createReadStream } = require("fs")
const Cart = require("../models/addToCart")

// ADD_TO_CART

exports.Cart = async(req, res) => {
    try {
        const cart = new Cart(req.body)
        cart.user = req.body.user
        cart.course = req.body.course
        cart.price = req.body.price
        cart.date = req.body.date
        cart.totalamount = req.body.totalamount
        cart.orderId = req.body.orderId
        cart.save()
        return res.status(200).json({ msg: "details add in cart", cart })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//GET-To-CART

exports.getcart = async(req, res) => {
    try {
        const getcart = await Cart.find({ user: req.params.userId }).populate("user")
            .populate("course");
        console.log(getcart)
        return res.status(200).json({ msg: "Cart fethced successfully", getcart })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE-COURSE-FROM-CART

exports.deletecourse = async(req, res) => {
    try {
        const deletecourse = await Cart.deleteOne({ _id: req.params.id })
        console.log(deletecourse)
        return res.status(200).json({ msg: "deleted course" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "domething went wring" })
    }
}