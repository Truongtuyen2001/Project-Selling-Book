import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const oderSchema = mongoose.Schema({
    arrOrder: {
        type: Array,
        ref: "Cart",
    },
    userId: {
        type: ObjectId,
        ref: "User",
    },
    address: {
        type: String,
        trim: true
    },
    nameKh: {
        type : String,
        trim: true,
        required : true
    },
    phone :{
        type: Number,
        trim: true,
        required: true
    },
    email : {
        type: String,
        trim: true,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', oderSchema)