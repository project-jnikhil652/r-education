const Shoping = require("../models/buyItem")

exports.Shoping = async(req, res) => {
    try {
        const shoping = new Shoping(req.body)
        shoping.save()
        return res.status(200).json({ msg: "shoping added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

exports.getshoping = async(req, res) => {
    try {
        const shoping = await Shoping.find({})
        return res.status(200).json({ msg: "shoping getted", shoping })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

exports.deleteshoping = async(req, res) => {
    try {
        const deleteshoping = await Shoping.deleteOne({ user: req.body.userId })
        return res.status(200).json({ msg: "shoping deleted", deleteshoping })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}