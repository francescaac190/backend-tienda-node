import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';

export const router = Router();

// GET /api/cart
router.get('/', cartController.getMyCart);

// POST /api/cart/add
router.post('/add', cartController.addItem);

// PUT /api/cart/item/:productId
router.put('/item/:productId', cartController.updateItemQuantity);

// DELETE /api/cart/item/:productId
router.delete('/item/:productId', cartController.removeItem);

// DELETE /api/cart
router.delete('/', cartController.clearCart);
