import { Request, Response } from 'express';
import * as UserManager from './manager';

const getUsers = async (req: Request, res: Response) => {
    res.json(await UserManager.getUsers(req.query));
};

const createUser = async (req: Request, res: Response) => {
    res.json(await UserManager.createUser(req.body));
};

export { getUsers, createUser };
