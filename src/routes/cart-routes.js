const router = require("express").Router()
const Controller = require("../controllers/cartController")
const auth = require("../middlewares/auth")

router.route("/addcart").post(Controller.Cart)
router.route("/getcart/:userId").get(Controller.getcart)
router.route("/deletecartincourse/:id").delete(Controller.deletecourse)

module.exports = router