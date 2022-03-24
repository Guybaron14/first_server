import { Router } from 'express';
import { wrapController } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import * as UserController from './controller';
import { createUserRequestSchema, getUserRequestSchema, deleteUserRequestSchema } from './validator.schema';

const userRouter: Router = Router();

// scopes: get
userRouter.get('/', ValidateRequest(getUserRequestSchema), wrapController(UserController.getUsers));

// scopes: create
userRouter.post('/', ValidateRequest(createUserRequestSchema), wrapController(UserController.createUser));

// scopes: delete
userRouter.delete('/:id', ValidateRequest(deleteUserRequestSchema), wrapController(UserController.deleteUser));

export default userRouter;
