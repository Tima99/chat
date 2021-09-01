import Joi from "joi"

const registerSchema = Joi.object({
    username         : Joi.string().min(3).max(20).required(),
    email            : Joi.string().email().required(),
    password         : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')),
    confirm_password : Joi.ref('password') 
})

export const loginSchema = Joi.object({
    email    : Joi.string().email().required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$'))
})

export const registerTeamSchema = Joi.object({
    teamname   : Joi.string().min(3).max(40).required(),
    sports     : Joi.string().required(),
    homeground : Joi.string().required(),
    password   : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')),
})

export default registerSchema;
