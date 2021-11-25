import express from 'express';

import { addCategories, showListCate, categoryId, updateCategories, cateDetail,removeCategories } from '../controllers/category';
const router = express.Router();

router.get('/categories', showListCate);
router.post('/addCategories', addCategories);
router.put('/categories/:categoryId', updateCategories );
router.get('/categories/:categoryId', cateDetail);
router.delete('/categories/:categoryId', removeCategories)
router.param('categoryId', categoryId);
module.exports = router;