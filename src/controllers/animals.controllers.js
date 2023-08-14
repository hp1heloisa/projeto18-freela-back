import { alterAtivation, createNewModelDB, getBreedsDB, getMainPhotoIdDB, getModelByIdDB,
         getModelsByUserIdDB, getModelsDB, getNewModelIdDB, insertMainPhotoDB, insertPhotosDB, 
         updateMainPhotoAnimalDB } from "../repositories/animals.repository.js";

export async function getBreeds(req, res) {
    try {
        const breeds = await getBreedsDB();
        res.send(breeds.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getBreedById(req, res){
    const { id } = req.params;
    try {
        const breeds = await getBreedsByIdDB();
        res.send(breeds.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function postNewModel(req, res){
    const {name, breedId, description, mainPhoto, photos} = req.body;
    const { userId } = res.locals;
    try {
        await createNewModelDB(name, breedId, description, userId);

        const animalId = await getNewModelIdDB(name, userId);

        await insertMainPhotoDB(mainPhoto, animalId.rows[0].id);

        const mainPhotoId = await getMainPhotoIdDB(animalId.rows[0].id);

        await updateMainPhotoAnimalDB(animalId.rows[0].id, mainPhotoId.rows[0].id);

        if (photos){
            await insertPhotosDB(photos, animalId.rows[0].id);
        }

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getModelById(req, res) {
    const { id } = req.params;
    try {
        const modelInfo = await getModelByIdDB(id);

        if (modelInfo.rowCount == 0) return res.sendStatus(404);

        res.send(modelInfo.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getMyModels(req, res) {
    const { userId } = res.locals;
    try {
        const myModels = await getModelsByUserIdDB(userId);
        res.send(myModels.rows)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getAllModels(req, res) {
    try {
        const allModels = await getModelsDB();
        res.send(allModels.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function activationModel(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;
    try {
        let active;

        const modelInfo = await getModelByIdDB(id);

        if (modelInfo.rowCount == 0) return res.sendStatus(404);

        console.log(modelInfo.rows);
        console.log(userId)

        if (modelInfo.rows[0].tutorId != userId) return res.sendStatus(401);

        if  (modelInfo.rows[0].active){
            active = false;
        } else {
            active = true;
        }
        
        await alterAtivation(id, active);
        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error.message);
    }
}