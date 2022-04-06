import * as jwt from 'jsonwebtoken';

// The only options you really need are audience, and scope.
interface ISpikeJWTValidations {
    // Main options
    audience: string | RegExp;
    scope: Array<string>;
    clientId?: string;
    clientName?: string;

    // Secondary options
    algorithms?: jwt.Algorithm[];
    issuer?: string;
    subject?: string;
    clockTolerance?: number;
    maxAge?: number | string;
}

interface ISpikeGetTokenOptions {
    tokenGrantType: string;
    tokenAudience: string;
    spikeURL: string;
    spikeGetTokenRoute: string;
    ClientId: string;
    ClientSecret: string;
    hostHeader?: boolean;
}

export { ISpikeJWTValidations, ISpikeGetTokenOptions };
