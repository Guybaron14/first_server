import * as jwt from 'jsonwebtoken';
import { ISpikeJWTValidations } from './interface';
import isSubsetArray from '../object';
import { getPK } from './publicKey';

const validateJWT = async (token: string, validations: ISpikeJWTValidations): Promise<void> => {
    const { scope, clientId, clientName, ...jwtVerifyOptions } = validations;

    const payload = jwt.verify(token, await getPK(), {
        clockTimestamp: Date.now() / 1000,
        ...jwtVerifyOptions,
    });

    if (typeof payload !== 'object') {
        throw new Error('Invalid JWT payload');
    }

    if (clientId && payload.clientId !== clientId) throw new Error('Invalid JWT clientId');

    if (clientName && payload.clientName !== clientName) throw new Error('Invalid JWT clientName');

    if (scope && !(Array.isArray(payload.scope) && isSubsetArray(scope, payload.scope)))
        throw new Error('Invalid JWT scope');
};

export default validateJWT;
