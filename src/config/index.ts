import * as env from 'env-var';
import './dotenv';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
        useCors: env.get('USE_CORS').default('false').asBool(),
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
};

export default config;
