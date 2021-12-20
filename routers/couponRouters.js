import express from 'express';
import { createCoupon } from '../controllers/couponController';
const router = express.Router();

router.post('/createCoupon', createCoupon);

module.exports = router;

