const { UserModel } = require('../models');
const { ValidationError } = require('../errors');
const passwordHelper = require('../helpers/password');
const otpHelper = require('../helpers/otp');
// const smsHelper = require('../helpers/sms');
// const emailHelper = require('../helpers/email');
const tokenHelper = require('../helpers/token');
const sendOtp = require('../helpers/send-signup-otp');
const moment = require('moment');

exports.signup = async(userIdentifier, password) => {
    try {
        const query = {};

        if (/^\d{10}$/.test(userIdentifier)) {
            query.phone_number = userIdentifier;
        } else {
            query.email = userIdentifier;
        }

        const userExist = await UserModel.findOne(query);
        if (userExist) {
            throw new ValidationError('User with given identifier already exists');
        }

        password = await passwordHelper.hashPassword(password);
        const user = new UserModel({...query, password });

        const otpMagnitude = await otpHelper.generateOTP();
        user.otp = {
            magnitude: otpMagnitude,
            created: moment().utc(),
            type: 'registration'
        };
        await user.save();

        await sendOtp.sendOtp(user);
        return {
            success: true,
            msg: `verification otp sent to ${userIdentifier}`
        }
    } catch (error) {
        throw error;
    }
}

exports.signupOtpVerification = async(userIdentifier, otp) => {
    try {
        const query = {};

        if (/^\d{10}$/.test(userIdentifier)) {
            query.phone_number = userIdentifier;
        } else {
            query.email = userIdentifier;
        }

        const user = await UserModel.findOne({
            ...query,
            "otp.magnitude": otp
        }).select("+otp");

        if (!user) {
            throw new ValidationError('invalid otp');
        }

        const isValidOtp = await otpHelper.verifyOTP({
            created: user.otp.created,
            userOTP: otp,
            magnitude: user.otp.magnitude,
            reqOTPType: 'registration',
            type: user.otp.type
        })

        if (!isValidOtp) {
            throw new ValidationError(`invalid otp`);
        }

        user.verified = true;
        user.otp = undefined;
        await user.save();

        const token = await tokenHelper.generateToken(user._id);

        return {
            success: true,
            msg: `user successfuly verified`,
            data: { token }
        }
    } catch (error) {
        throw error;
    }
}

exports.resendRegistrationOTP = async(userIdentifier) => {
    try {
        const query = {};

        if (/^\d{10}$/.test(userIdentifier)) {
            query.phone_number = userIdentifier;
        } else {
            query.email = userIdentifier;
        }

        const user = await UserModel.findOne({
            ...query,
        })

        if (!user) {
            throw new ValidationError('invalid user');
        }

        const otpMagnitude = await otpHelper.generateOTP();
        user.otp = {
            magnitude: otpMagnitude,
            created: moment().utc(),
            type: 'registration'
        };
        await user.save();

        await sendOtp.sendOtp(user);
        return {
            success: true,
            msg: `verification otp sent to ${userIdentifier}`
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

exports.login = async(userIdentifier, password) => {
    try {
        const query = generateQuery(userIdentifier);

        const user = await UserModel.findOne({
            ...query
        }).select('+password');

        if (!user) {
            throw new ValidationError('wrong credentials');
        }

        const isPasswordMatch = await passwordHelper.verifyPassword(password, user.password);

        if (!isPasswordMatch) {
            throw new ValidationError('wrong credentials');
        }

        const token = await tokenHelper.generateToken(user._id);

        return {
            success: true,
            msg: 'login successful',
            data: { token, user },
        }
    } catch (error) {
        throw error;
    }
}

exports.frogotPassword = async(userIdentifier) => {
    try {
        const query = generateQuery(userIdentifier);

        const user = await UserModel.findOne({
            ...query,
        })

        if (!user) {
            throw new ValidationError('invalid user');
        }

        const otpMagnitude = await otpHelper.generateOTP();
        user.otp = {
            magnitude: otpMagnitude,
            created: moment().utc(),
            type: 'password_reset'
        };
        await user.save();

        await sendOtp.sendOtp(user);
        return {
            success: true,
            msg: `password reset otp sent to ${userIdentifier}`
        }
    } catch (error) {
        throw error;
    }
}

exports.frogotPasswordOtp = async(userIdentifier, otp) => {
    try {
        const query = generateQuery(userIdentifier);

        const user = await UserModel.findOne({
            ...query,
            "otp.magnitude": otp
        }).select("+otp");

        if (!user) {
            throw new ValidationError('invalid otp');
        }

        const isValidOtp = await otpHelper.verifyOTP({
            created: user.otp.created,
            userOTP: otp,
            magnitude: user.otp.magnitude,
            reqOTPType: 'password_reset',
            type: user.otp.type
        })

        if (!isValidOtp) {
            throw new ValidationError(`invalid otp`);
        }

        user.otp = undefined;
        // await user.save();

        const passwordResetToken = await tokenHelper.passwordResetToken(user._id);
        user.passwordResetToken = passwordResetToken;

        console.log(user.passwordResetToken);
        await user.save();
        return {
            success: true,
            msg: `otp verified`,
            data: { passwordResetToken }
        }
    } catch (error) {
        throw error;
    }
}

exports.passwordReset = async(passwordResetToken, password) => {
    try {
        const user = await UserModel.findOne({
            passwordResetToken
        });

        if (!user) {
            throw new ValidationError('invalid password reset token');
        }

        user.password = await passwordHelper.hashPassword(password);
        user.passwordResetToken = undefined;

        await user.save();

        return {
            success: true,
            msg: 'password reset successful'
        }
    } catch (error) {
        throw error;
    }
}

const generateQuery = (userIdentifier) => {
    const query = {};

    if (/^\d{10}$/.test(userIdentifier)) {
        query.phone_number = userIdentifier;
    } else {
        query.email = userIdentifier;
    }

    return query;
}

exports.profileImage = async(userId, image) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('something went wrong');
        }

        user.profile_image = image;

        await user.save();

        return {
            success: true,
            msg: 'profile image uploaded successfuly',
        }
    } catch (error) {
        throw error;
    }
}

exports.getUserProfile = async(userId) => {
    try {
        const user = await UserModel.findById(userId).select({
            phone_number: 1,
            name: 1,
            email: 1,
            profile_image: 1,
            user_name: 1
        });

        if (!user) {
            throw new ValidationError('user not found');
        }

        return {
            success: true,
            msg: `user profile`,
            data: { userProfile: user }
        }
    } catch (error) {
        throw error;
    }
}

exports.changePassword = async(userId, passwordPayload) => {
    try {
        const user = await UserModel.findById(userId).select("+password");

        if (!user) {
            throw new ValidationError('user not found');
        }

        const isValidPassword = await passwordHelper.verifyPassword(passwordPayload.oldPassword, user.password);

        if (!isValidPassword) {
            throw new ValidationError(`incorrect password`);
        }

        user.password = await passwordHelper.hashPassword(passwordPayload.newPassword);
        await user.save();

        return {
            success: true,
            msg: 'password changed'
        }
    } catch (error) {
        throw error;
    }
}