import Joi from "joi";

//body: {email: "joao@driven.com.br", password: "driven"}
export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})