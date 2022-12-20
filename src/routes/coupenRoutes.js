const router = require("express").Router();


const controller = require("../controllers/coupponController");

router.post("/couponCode-discount",controller.addCouponCodeDiscount);
router.delete("/couponCode-delete/:id",controller.deletecoupen);

module.exports = router;