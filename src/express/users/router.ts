import { Router } from 'express';
import { wrapController } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import spikeMiddleware from '../../utils/spike/wrap';
import * as UserController from './controller';
import { createUserRequestSchema, getUserRequestSchema, deleteUserRequestSchema } from './validator.schema';

const userRouter: Router = Router();

userRouter.get(
    '/',
    spikeMiddleware(['read']),
    ValidateRequest(getUserRequestSchema),
    wrapController(UserController.getUsers),
);

userRouter.post(
    '/',
    spikeMiddleware(['create']),
    ValidateRequest(createUserRequestSchema),
    wrapController(UserController.createUser),
);

userRouter.delete(
    '/:id',
    spikeMiddleware(['delete']),
    ValidateRequest(deleteUserRequestSchema),
    wrapController(UserController.deleteUser),
);

export default userRouter;
