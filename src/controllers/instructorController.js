const { reservationsUrl } = require("twilio/lib/jwt/taskrouter/util")
const Instructor=require("../models/instructorModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const Review = require("../models/course-review");

const createToken = (instructor) => {
    return jwt.sign({ instructor }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };

// ADD-----INSTRUCTOR-------

exports.Instructor=async (req,res)=>{
    try {
        const { email } = req.body;
        if(email){
          const checkinstructor = await Instructor.findOne({ email: email });
          if (checkinstructor) {
              return res.status(400).json({
                  errors: [{ msg: "Email taken by someone please choose another email id" }]
              });
        }
    }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const instructor=new Instructor(req.body)
        instructor.password=hash
        instructor.save()
        return res.status(200).json({msg:"instructor added"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

// GET  ---  ALL  ---  INSTRUCTOR

exports.getinstructor=async (req,res)=>{
    try {
        const getinstructor=await Instructor.find({})
        console.log(getinstructor)
        return res.status(200).json({msg:"instructor getted",getinstructor})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

// GET --- Single --- INSTRUCTOR

exports.singleinstructor=async (req,res)=>{
    try {
        const singleinstructor=await Instructor.find({id:req.params.id})
        console.log(singleinstructor)
        return res.status(200).json({msg:"single instructer getted"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})        
    }
}

// UPDATE --- INSTRUCTOR

exports.updateinstructor=async (req,res)=>{
    try {
        const {name,email,coursename}=req.body;
        const updateinstructor=await Instructor.findByIdAndUpdate(req.params.id,{
            name,
            email,
            coursename
        })
        console.log(updateinstructor)
        return res.status(200).json({msg:"instructor updated"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

// DELETE --- SINGLE --- INSTRUCTOR

exports.deletesingleinstructor=async (req,res)=>{
    try {
        const deletesingleinstructor=await Instructor.findByIdAndDelete(req.params.id)
        console.log(deletesingleinstructor)
        return res.status(200).json({msg:"single instructer deleted",deletesingleinstructor})

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})        
    }
}

// INSTRUCTOR --- LOGIN

exports.instructorlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const instructer = await Instructor.findOne({ email });
        if (instructer) {
            const matched = await bcrypt.compare(password, instructer.password);
            if (matched) {
                const token = createToken(instructer);
                return res
                    .status(200)
                    .json({ msg: "You have login successfully", token, instructer });
            } else {
                return res
                    .status(401)
                    .json({ errors: [{ msg: "Password is not correct" }] });
            }
        } else {
            return res.status(404).json({ errors: [{ msg: "instructor not found" }] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

// get--review--on--course

exports.reviewoncourse=async (req,res)=>{
    try {
        const reviewoncourse=await Review.find({course:req.params.course})
        console.log(reviewoncourse)
        return res.status(200).json({msg:"ger review on course by instructor",reviewoncourse})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}
