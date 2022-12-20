const router = require("express").Router()
const Controller = require("../controllers/courseController")
const savedController = require("../controllers/savedcourseController")
const auth = require("../middlewares/auth")

// router.route("/addcourse").post(auth.instructorloggedIn, imageUplods, Controller.addcourse)
router.route("/getcourse/:id").get(Controller.getcourse)
router.route("/getcoursebycategory/:id").get(Controller.getcoursebycategory)
router.route("/getpopulorcourse").get(Controller.getpopulorcourse)
router.route("/savedCourse").post(savedController.savedCourse)
router.route("/getsavedCourse/:userId").get(savedController.getsavedCourse)

module.exports = router