const smsHelper = require('./sms');
const emailHelper = require('./email');

exports.sendOtp = async (user) => {
    try{
        if(user.email){
            await emailHelper.sendEmail({
                email: user.email,
                subject: `OTP for R Education verification`,
                body: `otp is ${user.otp.magnitude}`
            });
        } else{
            await smsHelper.sendSms({
                body: `otp for R Education is ${user.otp.magnitude}`,
                phoneNumber: `${user.country_code}${user.phone_number}`
            });
        }
    } catch(error){
        throw error;
    }
}