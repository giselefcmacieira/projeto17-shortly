import Joi from 'joi';

 //body: {name: "João", email: "joao@driven.com.br", password: "driven", confirmPassword: "driven"}
export const newUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
})
