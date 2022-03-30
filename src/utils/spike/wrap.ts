import { Request } from 'express';
import validateJWT from '.';
import { wrapSpike } from '../express';
import { ISpikeJWTValidations } from './interface';

const spikeMiddleware = (scopes: Array<string>) => {
    const validator = async (req: Request) => {
        const validationOptions: ISpikeJWTValidations = {
            audience: 'aLFUQ447znCQqVZb4daIjv9NM7CyPx',
            scope: scopes,
        };
        await validateJWT(String(req.rawHeaders[1]), validationOptions);
    };

    return wrapSpike(validator);
};

export default spikeMiddleware;
