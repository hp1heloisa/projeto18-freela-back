import { Router } from "express";
import { activationModel, getAllModels, getBreeds, getModelById, postNewModel } from "../controllers/animals.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { modelSchema } from "../schemas/animals.schema.js";

const animalsRouter = Router();

animalsRouter.get('/breeds', getBreeds);
animalsRouter.post('/model/new', validateSchema(modelSchema), validateAuth, postNewModel);
animalsRouter.get('/models/:id', getModelById);
animalsRouter.get('/models', getAllModels);
animalsRouter.put('/models/:id/activation', validateAuth, activationModel)

export default animalsRouter;