const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');

const couponCodeSchema = new Schema({
    couponCodeName: {
        type: String,
        min: 5,
        max: 15,
        trim: true,
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    discount: {
        type: String,
    },
    discountStatus: {
        type: Boolean,
        required: true
    },
    originalPrice: {
        type: Number
    },
    finalPrice: {
        type: Number,
    },
    createdAt: {
        type: String,
        default: moment().format("DD//MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    updatedAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    expirationTime: {
        type: String,
        required: true
    },
});

const CouponCodeDiscount = mongoose.model(
    "couponcode-discount-book",
    couponCodeSchema
);

module.exports = CouponCodeDiscount