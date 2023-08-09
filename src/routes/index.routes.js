import { Router } from "express";
import animalsRouter from "./animals.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.use(usersRouter);
router.use(animalsRouter);

export default router;