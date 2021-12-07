import CouponCodeDiscount from "../models/CouponCode";
import Book from "../models/book";
import moment from "moment";

export const addCouponCodeDiscount = async (req, res) => {
    const { couponCodeName, bookId, discount, discountStatus, expirationTime } = req.body;
    if (discount && expirationTime) {
        try {

            const { price } = await Book.findOne({ _id: bookId })
                .select('price')
                .exec();

            const originalPrice = price;

            const totalPrice = originalPrice - discount;
            const endDate = new Data(expirationTime);
            let currentDate = new Date().getTime();

            CouponCodeDiscount.findOne({ bookId }).exec(
                (newCouponCodePrice, couponCodePriceUpdate) => {
                    if (!couponCodePriceUpdate) {
                        if (
                            bookId &&
                            couponCodeName.length >= 5 &&
                            couponCodeName.length <= 15
                        ) {
                            const couponCodeDiscount = new CouponCodeDiscount({
                                couponCodeName,
                                discountStatus,
                                bookId,
                                discount,
                                originalPrice,
                                finalPrice: totalPrice,
                                expirationTime: endDate,
                            });

                            couponCodeDiscount.save().then((couponDiscountProduct) => {
                                return res.status(201).json({
                                    status: true,
                                    message: `Congrats,You have received Rs ${discount} as a product`,
                                    couponDiscountProduct
                                });
                            })
                                .catch((error) => {
                                    return res.status(400).json({
                                        status: false,
                                        message: " Đã xảy ra lỗi, Giảm giá hoặc thời gian hết hạn không hợp lệ",
                                        error,
                                    });
                                });
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Unmatched Coupon Code. Discount Denied !!",
                            });
                        }
                    }

                    if (couponCodePriceUpdate) {
                        const discountObj = {
                            couponCodeName,
                            discountStatus,
                            bookId,
                            discount,
                            originalPrice,
                            finalPrice: totalPrice,
                            expirationTime: endDate,
                        };

                        if (
                            discountObj.couponCodeName.length >= 5 &&
                            couponCodeName.length <= 15
                        ) {
                            CouponCodeDiscount.findOneAndDelete({ bookId: bookId },
                                discountObj,
                                {
                                    new: true,
                                    upsert: true
                                }
                            ).exec((error, couponDiscountProduct) => {
                                if (error) {
                                    return res.status(400).json({
                                        status: false,
                                        message: "Coupon Code Discount cannot be updated"
                                    });
                                }
                                if (couponDiscountProduct) {
                                    return res.status(201).json({
                                        status: true,
                                        message: `Coupon Code Discount is updated`,
                                        couponDiscountProduct
                                    });
                                }
                            });
                        } else {
                            return res.status(400).json({
                                status: false,
                                message: "Coupon Code length must be between 5 and 15.",
                            });
                        }
                    }
                }
            );
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Something went Wrong, Discount or expiration time is invalid ",
            });
        }
    }
}
