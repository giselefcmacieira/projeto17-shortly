import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import validateSchema from "../midllewares/validateSchema.js";
import validateSignUpEmail from "../midllewares/validateSignUpEmail.js";
import validateSignUpPassword from "../midllewares/validateSignUpPassword.js";
import validateUser from "../midllewares/validateUser.js";
import { newUserSchema } from "../schemas/newUserSchema.js";
import { userSchema } from "../schemas/userSchema.js";


const userRouter = Router();

userRouter.post('/signup', validateSchema(newUserSchema), validateSignUpPassword, validateSignUpEmail, signUp);
userRouter.post('/signin', validateSchema(userSchema), validateUser, signIn);

export default userRouter;