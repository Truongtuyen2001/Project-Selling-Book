import express from 'express';
import { isAuth, isAdmin, requireSignin, isManager } from '../controllers/auth';
import { addCategories, showListCate, categoryId, updateCategories, cateDetail, removeCategories } from '../controllers/category';
import { userById } from '../controllers/user';
const router = express.Router();

router.get('/categories', showListCate);
router.post('/addCategories', addCategories);
router.patch('/categories/:categoryId', updateCategories);
router.get('/categories/:categoryId', cateDetail);
router.delete('/categories/:categoryId', removeCategories)

router.param('userById', userById);
router.param('categoryId', categoryId);
module.exports = router;