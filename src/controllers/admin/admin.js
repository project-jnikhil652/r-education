require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../../models/user");
const Course = require("../../models/courseModel");
const Instructor = require("../../models/instructorModel")
const Admin = require("../../models/admin/admin")
const Otp = require("../../models/otp")
const Featurecourse = require('../../models/featured-course');
// const Featurecourse = require("../models/featured-course")
const md5 = require('md5');


const createToken = (admin) => {
    return jwt.sign({ admin }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// ADMIN-RIGISTER

exports.addadmin = async(req, res) => {
    try {
        req.body.password = md5(req.body.password);
        const admin = new Admin(req.body)
        admin.save()
        return res.status(200).json({ msg: "admin add successfuly" })
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({ msg: "someething went wrong" })
    }
}

// ADMIN LOGIN

exports.adminlogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            // const matched = await bcrypt.compare(password, admin.password);

            if (md5(password) == admin.password) {
                const token = createToken(admin);
                return res
                    .status(200)
                    .json({ msg: "You have login successfully", token, admin });
            } else {
                return res
                    .status(401)
                    .json({ errors: [{ msg: "Password is not correct" }] });
            }
        } else {
            return res.status(404).json({ errors: [{ msg: "Email not found" }] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};


// ADMIN MAIL SEND

exports.adminmailsend = async(req, res) => {
    const { email } = req.body;
    if (email === "") {
        res.status(500).json({ msg: "Email is required" });
    } else {
        try {
            const checkUser = await Admin.findOne({ email });
            if (checkUser) {
                let otpData = new Otp({
                    email,
                    otp: Math.floor(100000 + Math.random() * 900000),
                });

                let optResponse = await otpData.save();
                mailer(email, otpData.otp);
                return res.status(200).json({ msg: "OTP sended to your mail" });
            } else {
                return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: error });
        }
    }
};

// WAY_TO_SEND_MAIL

const mailer = (email, otp) => {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shadabakhtar476@gmail.com",
            pass: "razaraza",
        },
    });
    var mailOptions = {
        from: "shadabakhtar476@gmail.com",
        to: email,
        subject: "OTP mail",
        text: otp,
    };
    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

// ADMIN_FORGOT_PASSWORD

exports.adminforgotpassword = async(req, res) => {
    var { email, otp } = req.body;
    let code = await Otp.find({ email: email, otp: otp });
    if (code) {
        let currentTime = new Date().getTime();
        let diff = code.expireIn - currentTime;
        if (diff < 0) {
            return res.status(400).json({ errors: [{ msg: "Token expire" }] });
        } else {
            var email = req.body.email;
            let user = await Admin.findOne({ email });
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            user.password = hash;

            const OTPDelete = await Otp.deleteMany({
                email: email
            })
            user.save();
            return res.status(200).json({ msg: "Password changes successfully" });
        }
    } else {
        return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
};

// GET_ALL_USER_BY_ADMIN

exports.getAllUser = async(REq, res) => {
    try {
        const getAllUser = await User.find({})
        return res.status(200).json({ msg: "get all user successfully", getAllUser })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET_A_SPECIFIC_USER

exports.getsingleUser = async(req, res) => {
    try {
        const gelsingleUser = await User.findById({ _id: req.params.id })
        return res.status(200).json({ msg: "get single user successfully", gelsingleUser })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}


// BLOCK --- USER --- BY --- ADMiN

exports.block = async(req, res, ) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.status == "unblock") {
            user.status = "block"
        }
        await user.save()
        return res.status(200).json({ msg: `user changed to ${user.status}` });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

//   UNBLOCK --- USER --- BY --- ADMIN

exports.unblock = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.status == "block") {
            user.status = "unblock"
        }
        await user.save()
        return res.status(200).json({ msg: `user changed to ${user.status}` });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
};

//  << === GET === >> << === BLOCK === >> USER << === >> BY << === ADMIN === >>

exports.getblock = async(req, res) => {
    try {
        const getblock = await User.find({ status: "block" })
        return res.status(200).json({ msg: "block user getted", getblock })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === GET === >> << === UNBLOCK === >> USER << === >> BY << === ADMIN === >>

exports.getunblock = async(req, res) => {
    try {
        const getunblock = await User.find({ status: "unblock" })
        return res.status(200).json({ msg: "unblock user getted", getunblock })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === GET === >> << === All === >> INSTRUCTOR << === >> BY << === ADMIN === >>

exports.getinstructor = async(req, res) => {
    try {
        console.log(Instructor)
        const getinstructor = await Instructor.find({})
        console.log(getinstructor)
        return res.status(200).json({ msg: "instructor getted", getinstructor })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === GET === >> << === SINGLE === >> INSTRUCTOR << === >> BY << === ADMIN === >>

exports.singleinstructor = async(req, res) => {
    try {
        const singleinstructor = await Instructor.find({ id: req.params.id })
        console.log(singleinstructor)
        return res.status(200).json({ msg: "single instructer getted", data: singleinstructor })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === GET === >> << === INSTRUCTOR === >> COURSE << === >> BY << === ADMIN === >>

exports.getcourse = async(req, res) => {
    try {
        const getcourse = await Course.find()
        console.log(getcourse)
        return res.status(200).json({ msg: "getted instructor course ", data: getcourse })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}
exports.getsinglecourse = async(req, res) => {
    try {
        const getcourse = await Course.find({ _id: req.params.id })
        console.log(getcourse)
        return res.status(200).json({ msg: "getted instructor course ", data: getcourse })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === INSTRUCTOR === >> << === BLOCK === >> BY << === ADMIN === >>

exports.instructorblock = async(req, res, ) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (instructor.instructor_status == "unblock") {
            instructor.instructor_status = "block"
        }
        await instructor.save()
        return res.status(200).json({ msg: `instructor changed to ${instructor.instructor_status}` });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

//  << === INSTRUCTOR === >> << === UNBLOCK === >> BY << === ADMIN === >>

exports.instructorunblock = async(req, res, ) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (instructor.instructor_status == "block") {
            instructor.instructor_status = "unblock"
        }
        await instructor.save()
        return res.status(200).json({ msg: `instructor changed to ${instructor.instructor_status}` });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

//  << === GET === >> << === BLOCK === >> INSTRUCTOR" << === >> BY << === ADMIN === >>

exports.getinstructorblock = async(req, res) => {
    try {
        const getinstructorblock = await Instructor.find({ instructor_status: "block" })
        return res.status(200).json({ msg: "all block instructor getted", getinstructorblock })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === GET === >> << === UNBLOCK === >> INSTRUCTOR << === >> BY << === ADMIN === >>

exports.getinstructorunblock = async(req, res) => {
    try {
        const getunblock = await Instructor.find({ status: "unblock" })
        return res.status(200).json({ msg: "all unblock instructor getted", getunblock })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//  << === INSTRUCTOR === >> << === COURSE === >> << === APPROVED === >> BY << === ADMIN === >>

exports.Courseapproved = async(req, res, ) => {
    try {
        const instructor = await Course.findById(req.params.id);
        if (instructor.status == "pending") {
            instructor.status = "approved"
        }
        await instructor.save()
        return res.status(200).json({ msg: `Course changed to ${instructor.status}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

//  << === INSTRUCTOR === >> << === COURSE === >> << === REJECTED === >> BY << === ADMIN === >>


exports.Courserejected = async(req, res, ) => {
    try {

        const course = await Course.findById(req.params.id);
        if (course.status == "approved") {
            course.status = "rejected"
        }
        console.log(course.status)
        await course.save()
        return res.status(200).json({ msg: `Course changed to ${course.status}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

exports.addeaturedCourse = async(req, res, ) => {
    try {
        const course = await Featurecourse();
        course.course = req.params.id;
        await course.save()
        return res.status(200).json({ msg: `Course changed to ${course.status}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

exports.deletefeaturedCourse = async(req, res, ) => {
    try {

        const course = await Featurecourse.deleteOne({ course: req.params.id });
        return res.status(200).json({ msg: `Course deleted  ${req.params.id}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};