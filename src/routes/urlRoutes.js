import { Router } from "express";
import { createShortUrl, getUrlInfById } from "../controllers/urlController.js";
import validateSchema from "../midllewares/validateSchema.js";
import validateToken from "../midllewares/validateToken.js";
import validateUrlId from "../midllewares/validateUrlId.js";
import { urlSchema } from "../schemas/urlSchema.js";


const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSchema(urlSchema), validateToken, createShortUrl);
urlRouter.get('/urls/:id', validateUrlId, getUrlInfById);

export default urlRouter;