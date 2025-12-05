import { Router } from 'express';
import { router as productRouter } from './product.routes';
import { router as authRouter } from './auth.routes';
import { authMiddleware } from '../middlewares/auth';
import { router as cartRouter } from './cart.routes';
import { router as orderRouter } from './order.routes';


export const router = Router();

router.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

router.use('/products', authMiddleware, productRouter);

router.use('/auth', authRouter);

router.use('/cart', authMiddleware, cartRouter);

router.use('/orders', authMiddleware, orderRouter);