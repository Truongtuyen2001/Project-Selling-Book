import express from 'express';
import { addBook, listBook, bookById, detailBook, updateBook, removeBook} from '../controllers/book';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
const router = express.Router();

router.post('/book/create', addBook);
router.get('/book/list', listBook);
router.get('/book/detail/:id', detailBook);
router.put('/book/update/:id', updateBook);
router.delete('/book/remove/:id', removeBook)
router.param('id', bookById)

module.exports = router