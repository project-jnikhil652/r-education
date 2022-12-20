const Course = require("../models/courseModel")
const Instructor = require("../models/instructorModel")
const jwt = require("jsonwebtoken")
const fs = require('fs');
var path = require("path")

// COURSE_ADDED
const createToken = (instructor) => {
    return jwt.sign({ instructor }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

exports.addcourse = async(req, res) => {
    try {
        let courseImage = '';
        if (req.files) {
            let sampleFiles = req.files.courseImage;
            if (sampleFiles) {
                let uploadPath = "./public/images";
                sampleFiles.mv(uploadPath + '/' + sampleFiles.name);
                courseImage = uploadPath + '/' + sampleFiles.name;
            }
        }
        const instructor = await Instructor.findOne({ _id: req.body.instructorId });
        if (!instructor) {
            return res.status(400).json({ msg: "Instructor not found" })
        }
        const course = new Course();
        course.category = req.body.category;
        course.instructor = req.body.instructorId
        course.price = req.body.price
        course.quantity = req.body.quantity
        course.courseImage = courseImage;
        course.courseName = req.body.courseName
        course.instructorName = instructor.name
        course.about = {
            totalTiming: req.body.totalTiming,
            totalVideo: req.body.totalVideo,
            accessibility: req.body.accessibility,
            courseUploaded: req.body.courseUploaded,
            description: req.body.description,
        };
        course.save(function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
        })
        return res.status(200).json({ msg: "course added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET_COURSE
exports.getcourse = async(req, res) => {
    try {
        const getcourse = await Course.find({ instructor: req.params.id })
        return res.status(200).json({ msg: "course get successfully", getcourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE_COURSE
exports.deletecourse = async(req, res) => {
    try {
        const deletecourse = await Course.deleteOne({ _id: req.params.id })
        return res.status(200).json({ msg: "course delete successfully", deletecourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET---COURSE--BY--CATEGORY
exports.getcoursebycategory = async(req, res) => {
    try {
        const getcourse = await Course.find({ category: req.params.id })
        return res.status(200).json({ msg: "course get by category id successfully", getcourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET--POPULOR--COURSE
exports.getpopulorcourse = async(req, res) => {
    try {
        const getpopulorcourse = await Course.find({})
        return res.status(200).json({ msg: "get populor course", getpopulorcourse })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}