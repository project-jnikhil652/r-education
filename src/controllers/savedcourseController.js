const Saved = require("../models/savedCouse")


exports.savedCourse = async(req, res) => {
    try {
        const savedcourse = new Saved(req.body)
        savedcourse.user = req.body.userId
        savedcourse.course = req.body.course
        savedcourse.save()
        return res.status(200).json({ msg: "course Saved" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

exports.getsavedCourse = async(req, res) => {
    try {
        const getsavedCourse = await Saved.find({ user: req.params.userId })
            .populate("user")
            .populate("course")
        console.log(getsavedCourse)
        return res.status(200).json({ msg: "Courses Get", getsavedCourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}