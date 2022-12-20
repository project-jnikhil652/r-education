const multer = require("multer");
var path = require("path")
var image = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./upload/Image");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
var image = multer({ storage: image });

const imageUplods = image.fields([
    { name: 'courseImage', maxCount: 1 }
]);

const router = require("express").Router()
const Controller = require("../controllers/featured-controller")

router.route("/addfeaturedcourse").post(imageUplods, Controller.featurecourse)
router.route("/getfeaturedcourse").get(Controller.getfeaturecourse)
router.route("/deletefeaturedcourse/:id").delete(Controller.deletefeaturecourse)

module.exports = router