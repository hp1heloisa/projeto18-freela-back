import { db } from "../database/database.connection.js";

export function createSessionDB(userId, token){
    return db.query(`INSERT INTO sessions (token, "userId") VALUES ($1,$2);`, [token,userId]);
}

export function findSessionDB(token) {
    return db.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
}