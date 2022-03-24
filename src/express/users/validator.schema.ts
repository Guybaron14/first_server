import * as Joi from 'joi';
import { JoiMongoObjectId } from '../../utils/joi';

const getUserRequestSchema = Joi.object({
    query: {
        _id: JoiMongoObjectId.optional(),
        userId: Joi.string().alphanum().optional(),
        firstName: Joi.string().alphanum().optional(),
        lastName: Joi.string().alphanum().optional(),
    },
    body: {},
    params: {},
});

const createUserRequestSchema = Joi.object({
    body: {
        userId: Joi.string().alphanum().length(9).required(),
        firstName: Joi.string()
            .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
            .min(2)
            .max(20)
            .required(),
        lastName: Joi.string()
            .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
            .min(2)
            .max(20)
            .required(),
    },
    query: {},
    params: {},
});

const deleteUserRequestSchema = Joi.object({
    query: {},
    body: {},
    params: { id: Joi.string().required() },
});

export { getUserRequestSchema, createUserRequestSchema, deleteUserRequestSchema };
