const {userService} = require('../services');
const {ValidationError} = require('../errors');
const { UserModel } = require('../models');

exports.signup = async (req, res, next) => {
    try{
        const result = await userService.signup(req.body.userIdentifier, req.body.password);

        return res.status(200).json({
            msg: result.msg,
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.signupOtpVerification = async (req, res, next) => {
    try{
        const result = await userService.signupOtpVerification(req.body.userIdentifier, req.body.otp);

        return res.status(200).json({
            msg: result.msg,
            data: result.data
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.resendRegistrationOtp = async (req, res, next) => {
    try{
        const result = await userService.resendRegistrationOTP(req.body.userIdentifier);

        return res.status(200).json({
            msg: result.msg
        });
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try{
        const result = await userService.login(req.body.userIdentifier, req.body.password);

        return res.status(200).json({
            msg: result.msg,
            data: result.data
        })
    } catch(error) {
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.forgotPassword = async (req, res, next) => {
    try{
        const result = await userService.frogotPassword(req.body.userIdentifier);

        return res.status(200).json({
            msg: result.msg,
            data: result.data
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.forgotPasswordOtp = async (req, res, next) => {
    try{
        const result = await userService.frogotPasswordOtp(req.body.userIdentifier, req.body.otp);

        return res.status(200).json({
            msg: result.msg,
            data: result.data
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.passwordReset = async (req, res, next) => {
    try{
        const result = await userService.passwordReset(req.body.passwordResetToken, req.body.password);

        return res.status(200).json({
            msg: result.msg
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.uploadProfileImage = async (req, res, next) => {
    try{
        if(!req.file){
            throw new ValidationError('image not provided');
        }

        const image = `${process.env.BASE_URL}public/images/users/${req.file.filename}`;

        const result = await userService.profileImage(req.user._id, image);

        return res.status(200).json({
            msg: result.msg
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.getUserProfile = async (req, res, next) => {
    try{
        const result = await userService.getUserProfile(req.user._id);

        return res.status(200).json({
            msg: result.msg,
            data: result.data
        });
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.changePassword = async (req, res, next) => {
    try{
        const result = await userService.changePassword(req.user._id, req.body);

        return res.status(200).json({
            msg: result.msg
        })
    } catch(error){
        if(error instanceof ValidationError){
            error.status = 400;
        }
        console.log(error);
        next(error);
    }
}

exports.updateprofile=async (req,res)=>{
    try {
        const {name,user_name}=req.body
        const updateprofile=await UserModel.findOneAndUpdate(req.params.id,{
            name,
            user_name
        })
        return res.status(200).json({msg:"profile updated"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'something went wrong'})
    }
}



exports.getprofile=async (req,res)=>{
    try {
        const getprofile=await UserModel.find({})
        return res.status(200).json({msg:"profile getted",getprofile})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'something went wrong'})
    }
}