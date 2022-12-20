const router = require("express").Router()
const controller = require("../controllers/instructorController")
const addcoursevideoController = require("../controllers/coursevideoController")
const addcoursenotesController = require("../controllers/coursenotesController")
const addvideoController = require("../controllers/videoController")
const courseController = require("../controllers/courseController")


router.post("/instructor", controller.Instructor)
router.get("/getallinstructor", controller.getinstructor)
router.get("/getsingleinstructor/:id", controller.singleinstructor)
router.put("/updateinstructor/:id", controller.updateinstructor)
router.delete("/deleteinstructor/:id", controller.deletesingleinstructor)
router.post("/instructorlogin", controller.instructorlogin)
router.get("/reviewoncourse/:id", controller.reviewoncourse)

router.route("/addcoursevideo").post(addcoursevideoController.addcoursevideo)
router.get("/getcoursevideo/:id", addcoursevideoController.getcoursevideo)
router.delete("/deletecoursevideo/:key", addcoursevideoController.deletecoursevideo)

router.route("/addcoursenotes").post(addcoursenotesController.addcoursenotes)
router.get("/getcoursenotes", addcoursenotesController.getcoursenotes)
router.get("/deletecoursenotes", addcoursenotesController.deletecoursenotes)
    // router.get("/getmycourse", addcoursenotesController.getmycourse)
router.post("/addvideo", addvideoController.addvideo)
router.get("/getvideo/:id", addvideoController.getvideo)

router.route("/addcourse").post(courseController.addcourse)
router.route("/deletecourse/:id").delete(courseController.deletecourse)
router.route("/getcourse/:id").get(courseController.getcourse)
router.route("/getcoursebycategory/:id").get(courseController.getcoursebycategory)
router.route("/getpopulorcourse").get(courseController.getpopulorcourse)

module.exports = router