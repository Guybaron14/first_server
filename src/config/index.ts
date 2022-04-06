import * as env from 'env-var';
import './dotenv';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
        useCors: env.get('USE_CORS').default('false').asBool(),
        useAuthentication: env.get('USE_AUTHENTICATION').default('true').asBool(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asUrlString(),
        userCollectionName: env.get('MONGO_USER_COLLECTION_NAME').required().asString(),
    },
    spike: {
        publicKey: {
            path: env.get('SPIKE_PUBLIC_KEY_PATH').default('./certificate/publicKey.pem').asString(),
            downloadUrl: env
                .get('SPIKE_PUBLIC_KEY_DOWNLOAD_URL')
                .default('https://ospike.northeurope.cloudapp.azure.com/.well-known/publickey.pem')
                .asString(),
            renewalIntervalMs: env.get('SPIKE_PUBLIC_KEY_RENEWAL_INTERVAL_MS').default('0').asInt(),
        },
    },
    shraga: {
        URL: env.get('SHRAGA_URL').default('https://shraga.shraga.branch-yesodot.org').required().asString(),
        secret: env.get('SHRAGA_SECRET').default('secret').required().asString(),
        callbackURL: env.get('SHRAGA_CALLBACK_URL').default('http://localhost:8000/auth/callback').asString(),
    },
};

export default config;
