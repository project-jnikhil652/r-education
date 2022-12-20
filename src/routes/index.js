const router = require('express').Router();

router.get('/', function(req, res) {
    res.send("test")
});
router.use('/user', require('./user'));
router.use('/admin', require('./admin/admin-routes'))
router.use('/admin', require('./coupenRoutes'))
router.use('/user', require('./course-routes'))
router.use('/user', require('./cart-routes'))
router.use('/user', require('./categoryroutes'))
router.use('/user', require('./savedcourseRoutes'))
router.use('/instructor', require('./instructor-routes'))
router.use('/user', require("./notification-routes"))
router.use('/user', require('./shoping-routes'))
router.use('/user', require('./featured-routes'))
router.use('/user', require('./support-routes'))
router.use('/user', require('./courseReview-routes'))
    // router.use('/user', require('./video-routes'))
    // router.use('/instructor', require('./video_course'))
    // router.use('/instructor', require('./coursenotes-routes'))

module.exports = router;