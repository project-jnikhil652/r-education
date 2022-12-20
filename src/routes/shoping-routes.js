const router=require("express").Router()
const Controller=require("../controllers/shopingController")
const auth=require("../middlewares/auth")

router.route("/addshoping").post(auth.user,Controller.Shoping)
router.route("/getshoping").get(auth.user,Controller.getshoping)
router.route("/deleteshoping").delete(auth.user,Controller.deleteshoping)

module.exports=router