const router=require("express").Router()
const Controller=require("../controllers/savedcourseController")
const auth=require("../middlewares/auth")

router.route("/addsavedcourse").post(auth.user,Controller.savedCourse)
router.route("/getsavedcourse").get(auth.user,Controller.getsavedCourse)

module.exports=router