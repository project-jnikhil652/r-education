const router = require("express").Router()
const Controller = require("../controllers/notificationController")
const auth = require("../middlewares/auth")

router.route("/addnotification").post(Controller.addNotification)
router.route("/getnotification/:userId").get(Controller.getNotification)
router.route("/deletenotification").delete(Controller.deletenotification)


module.exports = router