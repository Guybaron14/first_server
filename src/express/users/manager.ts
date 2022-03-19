import { IUser, INewUser } from './interface';
import UserModel from './model';

const getUsers = (query: Partial<IUser>): Promise<IUser[]> => {
    return UserModel.find(query).exec();
};

const createUser = (user: INewUser): Promise<IUser> => {
    return UserModel.create(user);
};

export { getUsers, createUser };
