import Joi from "joi"
import {IS_USERNAME_REQUIRE} from "../config"

const registerSchema = Joi.object({
    username         : (IS_USERNAME_REQUIRE=="true") && Joi.string().min(3).max(20).required() || Joi.string().min(3).max(20),
    email            : Joi.string().email().required(),
    password         : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')),
    confirm_password : Joi.ref('password') 
})

export const loginSchema = Joi.object({
    email    : Joi.string().email().required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$'))
})

export default registerSchema;
