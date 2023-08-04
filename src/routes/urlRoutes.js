import { Router } from "express";
import { createShortUrl, deleteShortUrl, getUrlInfById, openUrl } from "../controllers/urlController.js";
import validateSchema from "../midllewares/validateSchema.js";
import validateShortUrl from "../midllewares/validateShortUrl.js";
import validateToken from "../midllewares/validateToken.js";
import validateUrlId from "../midllewares/validateUrlId.js";
import { urlSchema } from "../schemas/urlSchema.js";


const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSchema(urlSchema), validateToken, createShortUrl);
urlRouter.get('/urls/:id', validateUrlId, getUrlInfById);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', validateToken, validateShortUrl, deleteShortUrl)

export default urlRouter;