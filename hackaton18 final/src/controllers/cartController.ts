import { Request, Response } from 'express';
import Coupon from '../models/Coupon';

export const applyCoupon = async (req: Request, res: Response) => {
  try {
    const { code, total } = req.body;

    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(), 
      isActive: true,
      expiresAt: { $gt: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Cupón inválido o expirado' });
    }

    const discount = (total * coupon.discount) / 100;
    const finalTotal = total - discount;

    res.json({ discount, finalTotal, couponCode: coupon.code });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};