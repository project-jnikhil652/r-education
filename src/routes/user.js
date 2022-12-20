const router = require('express').Router();
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
const auth = require('../middlewares/auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user._id.toString()}-${(new Date()).getTime()}.${file.mimetype.split('/')[file.mimetype.split('/').length - 1]}`)
    }
});

const upload = multer({ storage });

router.post('/signup', validators.user.signup, userController.signup);
router.post('/signup-otp', validators.user.signupOtp, userController.signupOtpVerification);
router.post('/resend-signup-otp', validators.user.resendSignupOtp, userController.resendRegistrationOtp);
router.post('/login', validators.user.login, userController.login);
router.post('/forgot-password', validators.user.forgotPassword, userController.forgotPassword);
router.post('/forgot-password-otp', validators.user.forgotPasswordOtp, userController.forgotPasswordOtp);
router.post('/password-reset', validators.user.resetPassword, userController.passwordReset);
router.post('/profile-image', auth.user, upload.single('image'), userController.uploadProfileImage);
router.get('/profile', auth.user, userController.getUserProfile);
router.post('/change-password', auth.user, validators.user.changePassword, userController.changePassword);
router.put('/updateprofile', userController.updateprofile)
router.get('/getprofile', userController.getprofile)

module.exports = router;