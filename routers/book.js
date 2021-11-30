import express from 'express';
import { addBook, listBook, bookById, detailBook, updateBook, removeBook } from '../controllers/book';
import { requireSignin, isAdmin, isAuth, isManager } from '../controllers/auth';
import { userById } from '../controllers/user';
const router = express.Router();

router.post('/book/create', requireSignin, isAuth, isAdmin, isManager, addBook);
router.get('/book/list', listBook);
router.get('/book/detail/:id', detailBook);
router.patch('/book/update/:id', requireSignin, isManager, updateBook);
router.delete('/book/remove/:id', requireSignin, isAuth, isAdmin, isManager, removeBook);
router.param('id', bookById);
router.param('userById', userById);
module.exports = router