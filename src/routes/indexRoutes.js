import { Router } from "express";
import rankingRouter from "./rankingRoutes.js";
import urlRouter from "./urlRoutes.js";
import userRouter from "./userRoutes.js";


const router = Router();

router.use(userRouter);
router.use(urlRouter);
router.use(rankingRouter);

export default router;