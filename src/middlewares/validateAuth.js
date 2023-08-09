import { findSessionDB } from "../repositories/auth.repository.js";

export async function validateAuth(req, res, next) {
    let tokenOk;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    try {
        tokenOk = await findSessionDB(token);
        if (tokenOk.rowCount == 0) return res.sendStatus(401);

        res.locals.userId = tokenOk.rows[0].userId;
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}