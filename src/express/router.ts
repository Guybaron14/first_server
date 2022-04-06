import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { shragaCallbackMiddleware, shragaMiddleware } from './auth';
import { ServerError } from './error';
import userRouter from './users/router';

const appRouter = Router();

appRouter.use('/api/users', userRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.status(StatusCodes.OK).send('alive');
});

appRouter.post('/auth/callback', shragaCallbackMiddleware);

appRouter.get('/test/shraga', shragaMiddleware, (_req, res) => {
    res.send(_req.user);
});

appRouter.use('*', (_req, res, next) => {
    if (!res.headersSent) {
        next(new ServerError(StatusCodes.NOT_FOUND, 'Invalid route'));
    }
    next();
});

export default appRouter;
