import { Router } from 'express';
import path = require('path');
import { wrapController } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import * as UserController from './controller';
import { createUserRequestSchema, getUserRequestSchema, deleteUserRequestSchema } from './validator.schema';

const userRouter: Router = Router();
const { getSpikeAuthMiddleWare } = require('spike-auth-middleware');

const configuration = {
    audience: 'aLFUQ447znCQqVZb4daIjv9NM7CyPx', // Your Client's audienceId
    // As Mentioned In The Spike Client.
    allowedScopes: ['read'], // The Scopes that are allowed for this Middleware
    pathToPublicKey: path.resolve(__dirname, '../../../publickey.pem'),
};

// scopes: get
userRouter.get(
    '/',
    getSpikeAuthMiddleWare(configuration),
    ValidateRequest(getUserRequestSchema),
    wrapController(UserController.getUsers),
);

// scopes: create
userRouter.post(
    '/',
    getSpikeAuthMiddleWare(configuration),
    ValidateRequest(createUserRequestSchema),
    wrapController(UserController.createUser),
);

// scopes: delete
userRouter.delete('/:id', ValidateRequest(deleteUserRequestSchema), wrapController(UserController.deleteUser));

export default userRouter;
