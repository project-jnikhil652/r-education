const Support = require("../models/helpansupport")

// ADD_HELP_AND_SUPPORT

exports.support = async(req, res) => {
    try {
        const support = new Support(req.body)
        support.save()
        return res.status(200).json({ msg: "help and support added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'something went wrong' })
    }
}


// GET_HELP_AND_SUPPORT

exports.getsupport = async(req, res) => {
    try {
        const getsupport = await Support.find({ user: req.params.id })
            .populate("user")
        console.log(getsupport)
        return res.status(200).json({ msg: "getted help and support", getsupport })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

exports.getAllsupport = async(req, res) => {
    try {
        const getsupport = await Support.find({}).populate("user")
        console.log(getsupport)
        return res.status(200).json({ msg: "all help and support", getsupport })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}