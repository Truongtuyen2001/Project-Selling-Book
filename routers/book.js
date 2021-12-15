import express from 'express';
import { addBook, listBook, bookById, detailBook, updateBook, removeBook, listRelated, searchProduct, paginate,totalBook} from '../controllers/book';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
// import { paginate } from 'mongoose-paginate-v2';
const router = express.Router();
    
// thêm sản phẩm
router.post('/book/create',requireSignin, isAdmin, isAuth, addBook);
// danh sách sản phẩm
router.get('/book/list', listBook);
// lấy ra tổng số sách
// router.get('/totalBook', totalBook);
// chi tiết sản phẩm
router.get('/book/detail/:id', detailBook);
//cập nhật sản phẩm
router.patch('/book/update/:id',requireSignin, isAdmin, isAuth, updateBook);
//xoá sản phẩm
router.delete('/book/remove/:id',requireSignin, isAdmin, isAuth, removeBook);
//lấy sản phẩm theo danh mục
router.get('/book/related/:id',listRelated);
//tìm kiếm sản phẩm
router.post("/book/search", searchProduct);
//lấy id của sách
router.param('id', bookById);
//lấy id của user
router.param('userById', userById);


module.exports = router