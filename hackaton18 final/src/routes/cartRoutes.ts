import express from 'express';
import { applyCoupon } from '../controllers/cartController';

const router = express.Router();

router.post('/apply-coupon', applyCoupon);

export default router;