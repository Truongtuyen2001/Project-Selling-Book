import express from 'express';
import { addBook, listBook, bookById, detailBook, updateBook, removeBook, listRelated, searchProduct, paginate} from '../controllers/book';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
// import { paginate } from 'mongoose-paginate-v2';
const router = express.Router();
    
// thêm sản phẩm
router.post('/book/create', addBook);
// danh sách sản phẩm
router.get('/book/list', listBook);
// chi tiết sản phẩm
router.get('/book/detail/:id', detailBook);
//cập nhật sản phẩm
router.patch('/book/update/:id', updateBook);
//xoá sản phẩm
router.delete('/book/remove/:id', removeBook);
//lấy sản phẩm theo danh mục
router.get('/book/related/:id',listRelated);
//tìm kiếm sản phẩm
router.post("/book/search", searchProduct);
//lấy id của sách
router.param('id', bookById);
//lấy id của user
router.param('userById', userById);


module.exports = router