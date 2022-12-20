const nodemailer = require('nodemailer');
const sg_mail = require('@sendgrid/mail');
sg_mail.setApiKey(process.env.SENDGRID_API_KEY);
const mailTransporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
});

/**
 * 
 * @param {Object} emailPayload
 * @param {string} emailPayload.email
 * @param {string} emailPayload.subject
 * @param {string} emailPayload.body 
 */
exports.sendEmail = async (emailPayload) => {
    try {
        const msg = {
            to: emailPayload.email, // Change to your recipient
            from: process.env.EMAIL, // Change to your verified sender
            subject: emailPayload.subject,
            text: emailPayload.body,
            html: emailPayload.body,
        }
        sg_mail.send(msg).then(() => {
            console.log('Email sent');
            // return res.send({ "status": 200, "message": "Otp send successfully", "error": false });
        }).catch((error) => {
            console.error(error)
            // return res.send({ "status": 500, "message": "Otp send Failed", "error": true });
        });
        // await mailTransporter.sendMail({
        //     from: `nikhilflyweis@gmail.com`,
        //     to: emailPayload.email,
        //     subject: emailPayload.subject,
        //     text: emailPayload.body
        // });
    } catch (error) {
        throw error;
    }
}