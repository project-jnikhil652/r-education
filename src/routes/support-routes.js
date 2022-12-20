const router = require("express").Router()
const Controller = require("../controllers/supportController")
const auth = require("../middlewares/auth")

router.route('/addsupport').post(auth.user, Controller.support)
router.route('/getsupport/:id').get(auth.user, Controller.getsupport)
router.route('/getallsupport/').get(auth.user, Controller.getAllsupport)

module.exports = router