import { db } from "../database/database.connection.js";

export function getBreedsDB(){
    return db.query(`SELECT * FROM breeds ORDER BY breed;`);
}

export function createNewModelDB(name, breedId, description, userId){
    return db.query(`
        INSERT INTO animals (name, "breedId", description, "userId") VALUES ($1,$2,$3,$4);
    `, [name, breedId, description, userId]);
}

export function getNewModelIdDB(name, userId){
    return db.query(`
        SELECT id FROM animals WHERE name=$1 AND "userId"=$2 AND "mainPhotoId" IS NULL;
    `, [name, userId]);
}

export function insertMainPhotoDB(urlImage, animalId) {
    return db.query(`
        INSERT INTO photos ("urlImage", "animalId") VALUES ($1, $2);
    `, [urlImage, animalId]);
}

export function getMainPhotoIdDB(animalId) {
    return db.query(`SELECT id FROM photos WHERE "animalId"=$1`, [animalId]);
}

export function updateMainPhotoAnimalDB(id, mainPhotoId){
    return db.query(`UPDATE animals SET "mainPhotoId"=$1 WHERE id=$2`, [mainPhotoId, id]);
}

export function insertPhotosDB(photos, animalId){
    let query = `INSERT INTO photos ("urlImage", "animalId") VALUES `;
    for (let i=0; i < photos.length; i++){
        if (i+1 == photos.length){
            query += `($${i+2}, $1)`;
        } else {
            query += `($${i+2}, $1),`;
        }
    }
    return db.query(query, [animalId, ...photos]);
}

export function getModelByIdDB(id) {
    return db.query(`           
        SELECT animals.id, animals.name, breeds.breed, animals.description, users.name as tutor, users.email,
        users."phoneNumber", animals.active, animals."mainPhotoId", array_agg(json_build_object('id', 
        photos.id, 'urlImage',photos."urlImage")) as "animalPhotos" FROM photos JOIN animals ON 
        animals.id=photos."animalId" JOIN breeds ON animals."breedId" = breeds.id JOIN users ON 
        animals."userId"=users.id WHERE "animalId" = $1 GROUP BY animals.id, breeds.breed, users.name, 
        users.email, users."phoneNumber";
    `, [id])
}

export function getModelsByUserIdDB(userId) {
    return db.query(`
        SELECT animals.id, animals.name, animals.description, animals.active photos."urlImage" as "mainImage"
        FROM photos JOIN animals ON photos.id = animals."mainPhotoId" WHERE "userId"=2 ORDER BY animals.id DESC;
    `, [userId])
}

export function getModelsDB() {
    return db.query(`
        SELECT animals.id, animals.name, animals.description, photos."urlImage" 
        as "mainImage" FROM photos JOIN animals ON photos.id = animals."mainPhotoId" 
        WHERE animals.active = true;   
    `)
}

export function alterAtivation(id, active) {
    return db.query(`
        UPDATE animals SET active=$1 WHERE id=$2;
    `, [active, id]);
}