import { Router } from 'express';
import { router as productRouter } from './product.routes';

export const router = Router();

router.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

router.use('/products', productRouter);
