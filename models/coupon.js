import mongoose from 'mongoose';
import moment  from 'moment';
const { ObjectId } = mongoose.Schema;
const couponSchema = mongoose.Schema({
    nameCode: {
        type: String,
        min: 5,
        max: 15,
        trim: true,
        required: true,
    },
    bookId: {
        type: ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: Boolean,
        required: true,
    },
    startDate: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Coupon", couponSchema)