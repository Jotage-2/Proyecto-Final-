import { Request, Response } from 'express';
import Order from '../models/Order';
import { AuthRequest } from '../middleware/authMiddleware';

export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const { items, total, discount = 0, culqiToken } = req.body;

    // Simulación de pago con Culqi
    const chargeId = `charge_fake_${Date.now()}`;

    const order = await Order.create({
      user: req.userId,
      items,
      total,
      discount,
      finalTotal: total - discount,
      paymentStatus: 'completed',
      culqiChargeId: chargeId
    });

    res.status(201).json({ message: 'Compra exitosa', order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};