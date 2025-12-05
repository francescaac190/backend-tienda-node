import { Response, NextFunction } from 'express';
import { cartService } from '../services/cart.service';
import { AuthRequest } from '../middlewares/auth';

export const cartController = {
  getMyCart: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const cart = await cartService.getMyCart(req.user.userId);
      res.json(cart);
    } catch (err) {
      next(err);
    }
  },

  addItem: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const { productId, quantity } = req.body as {
        productId?: number;
        quantity?: number;
      };

      if (!productId || quantity == null) {
        return res
          .status(400)
          .json({ message: 'productId y quantity son obligatorios' });
      }

      const cart = await cartService.addItem(
        req.user.userId,
        Number(productId),
        Number(quantity)
      );

      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  },

  updateItemQuantity: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const productId = Number(req.params.productId);
      const { quantity } = req.body as { quantity?: number };

      if (isNaN(productId)) {
        return res.status(400).json({ message: 'productId inválido' });
      }

      if (quantity == null) {
        return res
          .status(400)
          .json({ message: 'quantity es obligatorio en el body' });
      }

      const cart = await cartService.updateItemQuantity(
        req.user.userId,
        productId,
        Number(quantity)
      );

      res.json(cart);
    } catch (err) {
      next(err);
    }
  },

  removeItem: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const productId = Number(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ message: 'productId inválido' });
      }

      const cart = await cartService.removeItem(req.user.userId, productId);
      res.json(cart);
    } catch (err) {
      next(err);
    }
  },

  clearCart: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      const cart = await cartService.clearCart(req.user.userId);
      res.json(cart);
    } catch (err) {
      next(err);
    }
  },
};
