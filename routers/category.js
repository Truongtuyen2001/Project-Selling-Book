import express from 'express';
import { isAuth, isAdmin, requireSignin, isManager } from '../controllers/auth';
import { addCategories, showListCate, categoryId, updateCategories, cateDetail, removeCategories } from '../controllers/category';
const router = express.Router();

router.get('/categories', showListCate);
router.post('/addCategories', requireSignin, isAuth, isAdmin, isManager, addCategories);
router.patch('/categories/:categoryId', requireSignin, isAuth, isAdmin, isManager, updateCategories);
router.get('/categories/:categoryId', cateDetail);
router.delete('/categories/:categoryId', requireSignin, isAuth, isAdmin, isManager, removeCategories)
router.param('categoryId', categoryId);
module.exports = router;