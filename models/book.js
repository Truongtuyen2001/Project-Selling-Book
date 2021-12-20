import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2")
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
    },
    discount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
    },
    // likes: {
    //     type: Number,
    //     default: 0
    // }
}, { timestamps: true });


const Book = mongoose.model("Book", bookSchema);
module.exports = Book

// for (let i = 0; i <= 50; i++) {
//     Book.create({
//         name: "Trương Tuyển" + i,
//         price: 2000,
//         image: "ok" + i,
//         description: "Ok" + i,
//         status: "OK",
//         author: "Ngô thừa ân",
//         discount: 20,
//         quantity: 4
//     })
// }