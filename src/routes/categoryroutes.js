const multer = require("multer");
var path = require("path")
    // var image = multer.diskStorage({
    //     destination: function(req, file, cb) {
    //         cb(null, "./upload/Image");
    //     },
    //     filename: function(req, file, cb) {
    //         cb(null, Date.now() + path.extname(file.originalname));
    //     },
    // });
    // var image = multer({ storage: image });

// const imageUplods = image.fields([
//     { name: 'categoryImage', maxCount: 1 }
// ]);

const router = require("express").Router()
const controller = require("../controllers/category-controller")

router.post("/addcategory", controller.addcategory)
router.get("/getcategory", controller.getcategory)
router.delete("/deletecategory/:id", controller.deletecategory)
router.put("/updatecategory/:id", controller.updatecategory)

module.exports = router