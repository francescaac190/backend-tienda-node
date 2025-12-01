import { Router } from 'express';
import { router as productRouter } from './product.routes';
import { router as authRouter } from './auth.routes';
import { authMiddleware } from '../middlewares/auth';

export const router = Router();

router.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

router.use('/products', authMiddleware, productRouter);

router.use('/auth', authRouter);
