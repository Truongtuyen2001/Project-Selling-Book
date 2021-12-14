import express from 'express';
import { addWish, wishById, listWish, updateWishLike, removeWishList } from '../controllers/wishList';

const wishRouter = express.Router();

// add wishlist
wishRouter.post('/saveWishList', addWish);
// danh sách ưu thích
wishRouter.get('/wishList', listWish);
// cập nhật yêu thích
wishRouter.patch('/update/wishList', updateWishLike);
// lấy id chung
wishRouter.param('idWishList', wishById);
// xoá sản phẩm ưu thích
wishRouter.delete('/deleteWishList/:idWishList', removeWishList);


module.exports = wishRouter;