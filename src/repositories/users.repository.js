import { db } from "../database/database.connection.js"

export function getUserByCpfDB(cpf){
    return db.query(`SELECT * FROM users WHERE cpf=$1`, [cpf]);
}

export function getUserByEmailDB(email){
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}


export function createUserDB(name, cpf, email, password, phoneNumber){
    return db.query(`
        INSERT INTO users (name, cpf, email, password, "phoneNumber") VALUES ($1,$2,$3,$4,$5);
    `, [name, cpf, email, password, phoneNumber]);
}
