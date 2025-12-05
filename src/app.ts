import express, { Application } from 'express';
import cors from 'cors';
import { router as apiRouter } from './routes';
import { notFoundHandler } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

export const createApp = (): Application => {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api', apiRouter);

    // 404 Not Found Handler
    app.use(notFoundHandler);

    // Global Error Handler
    app.use(errorHandler);

    return app;
};

//configuración del servidor HTTP