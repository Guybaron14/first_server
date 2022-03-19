import * as mongoose from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    userId: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export type INewUser = Pick<IUser, 'userId' | 'firstName' | 'lastName'>;
