import { Router } from 'express';
import { wrapController } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import * as UserController from './controller';
import { createUserRequestSchema, getUserRequestSchema } from './validator.schema';

const userRouter: Router = Router();

userRouter.get('/', ValidateRequest(getUserRequestSchema), wrapController(UserController.getUsers));

userRouter.post('/', ValidateRequest(createUserRequestSchema), wrapController(UserController.createUser));

export default userRouter;
