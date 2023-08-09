import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().min(11).max(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    phoneNumber: Joi.string().min(11).max(11).required()
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})