import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { wrapMiddleware } from '../utils/express';
import { formatShragaUser, verifyShragaJwt } from '../utils/shraga';
import { ServerError } from './error';

const shragaMiddleware = wrapMiddleware(async (req: Request, res: Response) => {
    const token = req.cookies['access-token'];
    // if (!token) throw new ServerError(StatusCodes.UNAUTHORIZED, 'Missing JWT token in cookie.');

    try {
        req.user = formatShragaUser(await verifyShragaJwt(token));
    } catch (error) {
        const { URL, callbackURL, secret } = config.shraga;
        res.redirect(
            `${URL}/setCallback/${encodeURIComponent(callbackURL)}` +
                `?SignInSecret=${encodeURIComponent(secret)}` +
                `&useEnrichId=true` +
                `&RelayState=${req.originalUrl}`,
        );
    }
});

const shragaCallbackMiddleware = wrapMiddleware(async (req: Request, res: Response) => {
    const token = req.query.jwt;
    if (!(typeof token === 'string'))
        throw new ServerError(StatusCodes.UNAUTHORIZED, 'Missing or Invalid JWT token in query.');

    const payload = await verifyShragaJwt(token).catch((err: Error) => {
        throw new ServerError(StatusCodes.UNAUTHORIZED, `Failed to validate JWT token: ${err.message}`);
    });

    res.cookie('access-token', token);

    res.redirect(payload.RelayState || '/');
});

export { shragaMiddleware, shragaCallbackMiddleware };
