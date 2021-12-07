import mongoose  from 'mongoose';
const { ObjectId } = mongoose.Schema;
let cartSchema = new mongoose.Schema({
    idUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    idBook: {
        type: ObjectId,
        ref: "Book"
    },
    quantity: {
        type : Number,
        required : true,
        minlength: 1
    },
    // price: {
    //     type: Number,
    //     reuqired: true
    // }
},{timestamps: true});

module.exports = mongoose.model('Cart', cartSchema);