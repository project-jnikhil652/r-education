const Featurecourse = require("../models/featured-course")

// ADD--FEATURED--COURSE

exports.featurecourse = async(req, res) => {
    try {
        const featurecourse = new Featurecourse();
        featurecourse.coursename = req.body.coursename
        featurecourse.courseImage = req.files['courseImage'][0].filename
        console.log(featurecourse)
        featurecourse.save()
        return res.status(200).json({ msg: "featured course added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET--FEATURED-COURSE

exports.getfeaturecourse = async(req, res) => {
    try {
        const featurecourse = await Featurecourse.find({});
        return res.status(200).json({ msg: "featured course getted", featurecourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE---FEATURED--COURSE

exports.deletefeaturecourse = async(req, res) => {
    try {
        const deletefeaturecourse = await Featurecourse.deleteOne({ _id: req.params.id });
        return res.status(200).json({ msg: "featured course deleted", deletefeaturecourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}