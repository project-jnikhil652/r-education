const Review = require("../models/course-review")

// ADD-REVIEW

exports.review = async(req, res) => {
    try {
        const review = new Review(req.body)
        review.save()
        return res.status(200).json({ msg: "course review added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET--REVIEW

exports.getreview = async(req, res) => {
    try {
        const getreview = await Review.find({ course: req.body.courseId, user: req.body.userId })
            .populate("course", "courseName courseImage")
        console.log(getreview)
        return res.status(200).json({ msg: "course review getted", getreview })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE---REVIEW

exports.deletereview = async(req, res) => {
    try {
        const deletereview = await Review.deleteOne({ _id: req.params.id })
        console.log(deletereview)
        return res.status(200).json({ msg: "course review deleted", deletereview })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}