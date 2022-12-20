const router = require("express").Router()
const Controller = require("../controllers/review-controller")
const auth = require("../middlewares/auth")

router.route("/addreview").post(Controller.review)
router.route("/getreview").post(Controller.getreview)
router.route("/deletereview/:id").delete(Controller.deletereview)

module.exports = router