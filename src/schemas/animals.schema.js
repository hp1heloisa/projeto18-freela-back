import Joi from "joi";

export const modelSchema = Joi.object({
    name: Joi.string().required(),
    breedId: Joi.number().required(),
    description: Joi.string().required(),
    mainPhoto: Joi.string().uri().required(),
    photos: Joi.array().items(Joi.string().uri().required()),
});
