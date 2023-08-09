import { Router } from "express";
import { getMyModels } from "../controllers/animals.controllers.js";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(signUpSchema), signUp);
usersRouter.post('/signin', validateSchema(signInSchema), signIn);
usersRouter.get('/models/mine', validateAuth, getMyModels);

export default usersRouter;