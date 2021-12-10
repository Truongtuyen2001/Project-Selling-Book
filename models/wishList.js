import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const WishListSchema = new mongoose.Schema({
    idUser :{
        type: ObjectId,
        ref: "User",
        required: true
    },
    idBook: {
        type: ObjectId,
        ref: "Book",
        required: true
    },
    Wish: {
        type: String,
        required: true
    }
})
const Wishlist = new mongoose.model('Wishlist', WishListSchema);
module.exports = Wishlist;