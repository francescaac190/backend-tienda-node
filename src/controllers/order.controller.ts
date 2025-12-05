import { Response, NextFunction } from 'express';
import { orderService } from '../services/order.service';
import { AuthRequest } from '../middlewares/auth';

export const orderController = {
  createOrderFromCart: async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const order = await orderService.createOrderFromCart(req.user.userId);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },

  getMyOrders: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const orders = await orderService.getMyOrders(req.user.userId);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },
};
