import Joi from "joi";
import { emailRegexp } from "../constacts/user.js";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required() ,
});

export const loginuserSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp ).required(),
    password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordShema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});