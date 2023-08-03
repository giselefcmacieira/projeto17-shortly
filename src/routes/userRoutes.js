import { Router } from "express";
import { signUp } from "../controllers/userController.js";
import validateSchema from "../midllewares/validateSchema.js";
import validateSignUpEmail from "../midllewares/validateSignUpEmail.js";
import validateSignUpPassword from "../midllewares/validateSignUpPassword.js";
import { newUserSchema } from "../schemas/newUserSchema.js";


const userRouter = Router();

userRouter.post('/signup', validateSchema(newUserSchema), validateSignUpPassword, validateSignUpEmail, signUp);

export default userRouter;