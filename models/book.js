import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const bookSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        required: true,
        maxLength: 32,
    },
    price: {
        type: Number,
        required: true,
        maxLength: 30,
    },
    cateId: {
        type: ObjectId,
        ref: "Categories",
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        required: true,
        type: String
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true } 

)
module.exports = mongoose.model("Book",bookSchema)
