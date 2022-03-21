/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import config from '../src/config';
import Server from '../src/express/server';

jest.setTimeout(30000);

const removeAllCollections = async () =>
    Promise.all(Object.values(mongoose.connection.collections).map((collection) => collection.deleteMany({})));

describe('example unit tests', () => {
    let app: Express.Application;

    beforeAll(async () => {
        await mongoose.connect(config.mongo.uri);
        await removeAllCollections();
        app = Server.createExpressApp();
    });

    afterEach(async () => {
        await removeAllCollections();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('/isAlive', () => {
        it('should return alive', async () => {
            const response = await request(app).get('/isAlive').expect(200);
            expect(response.text).toBe('alive');
        });
    });

    describe('/unknownRoute', () => {
        it('should return status code 404', () => {
            return request(app).get('/unknownRoute').expect(404);
        });
    });

    describe('/api/users', () => {
        describe('POST', () => {
            it('should fail validation for unknown fields', () => {
                return request(app).post('/api/users').send({ invalidField: 'some value' }).expect(400);
            });

            it('should fail because of missing fields ', async () => {
                return request(app).post('/api/users').send({}).expect(400);
            });

            it('should fail with duplicate key error ', async () => {
                const newUser = { userId: '888444555', firstName: 'Guy', lastName: 'Baron' };
                await request(app).post('/api/users').send(newUser).expect(200);
                const { body: err } = await request(app).post('/api/users').send(newUser).expect(400);

                expect(err.message).toBe('Duplicate key error: Object with {"userId":"888444555"} already exists.');
            });

            it('should create a user', async () => {
                const newUser = { userId: '888444555', firstName: 'Guy', lastName: 'Baron' };
                const { body: createdUser } = await request(app).post('/api/users').send(newUser).expect(200);

                expect(mongoose.Types.ObjectId.isValid(createdUser._id)).toBe(true);
                expect(createdUser).toMatchObject(newUser);
                expect(new Date(createdUser.createdAt).getTime()).toBeCloseTo(Date.now(), -2);
                expect(new Date(createdUser.updatedAt).getTime()).toBeCloseTo(Date.now(), -2);
            });
        });

        describe('GET', () => {
            it('should return all users', async () => {
                const newUser = { userId: '888444555', firstName: 'Guy', lastName: 'Baron' };
                await request(app).post('/api/users').send(newUser).expect(200);

                const { body: users } = await request(app).get('/api/users').expect(200);
                expect(users).toHaveLength(1);
                expect(mongoose.Types.ObjectId.isValid(users[0]._id)).toBe(true);
            });
        });
    });
});
