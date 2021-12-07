const express = require('express');

const router = express.Router();
import { addCouponCodeDiscount } from "../controllers/CouponCode";
import CouponCodeDiscount from "../models/CouponCode";

router.post("/couponCode-discount", addCouponCodeDiscount)

const checkExpirationTime = () => {
    CouponCodeDiscount.find({})
        .exec()
        .then((Coupon) => {
            if (Coupon) {
                Coupon.map((getCoupon) => {
                    if (
                        new Date().getTime() >= new Data(getCoupon.expirationTime).getTime()
                    ) {
                        CouponCodeDiscount.findOneAndDelete({
                            _id: getCoupon._id,
                        })
                            .exec()
                            .then((deleteCoupon) => {
                                console.log(`Coupon doesnt exists or expired`);
                            })
                            .catch((error) => {
                                console.log(error, "Error occured on coupon section");
                            });
                    }
                });
            }
            if (!Coupon) {
                console.log("No Coupon found")
            }
        });
};
setInterval(checkExpirationTime, 1000);

module.exports = router;