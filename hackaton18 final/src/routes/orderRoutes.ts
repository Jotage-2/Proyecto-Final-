import express from 'express';
import { checkout, getMyOrders } from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/checkout', protect, checkout);
router.get('/me', protect, getMyOrders);

export default router;  