import express from 'express';
import { addBook, listBook, bookById, detailBook, updateBook, removeBook } from '../controllers/book';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
const router = express.Router();

router.post('/book/create', addBook);
router.get('/book/list', listBook);
router.get('/book/detail/:id', detailBook);
router.patch('/book/update/:id', updateBook);
router.delete('/book/remove/:id', removeBook);
router.param('id', bookById);
router.param('userById', userById);
module.exports = router