// src/routes/order.routes.ts
import { Router } from 'express';
import { orderController } from '../controllers/order.controller';

export const router = Router();

// POST /api/orders  -> crea una orden a partir del carrito actual
router.post('/', orderController.createOrderFromCart);

// GET /api/orders/my -> lista las órdenes del usuario actual
router.get('/my', orderController.getMyOrders);
