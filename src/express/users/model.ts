import * as mongoose from 'mongoose';
import config from '../../config';
import { errorHandler } from '../../utils/mongoose';
import { IUser } from './interface';

const UserSchema = new mongoose.Schema<IUser & mongoose.Document>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

UserSchema.index({ userId: 1 });
UserSchema.index({ firstName: 1, lastName: 1 });

UserSchema.post(/save|update|findOneAndUpdate|insertMany/, errorHandler);

const UserModel = mongoose.model<IUser & mongoose.Document>(config.mongo.userCollectionName, UserSchema);

export default UserModel;
