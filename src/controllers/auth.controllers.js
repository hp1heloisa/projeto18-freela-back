import { createUserDB, getUserByCpfDB, getUserByEmailDB } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"; 
import { createSessionDB } from "../repositories/auth.repository.js";

export async function signUp(req, res){
    const { name, cpf, email, password, phoneNumber} = req.body;
    try {
        const cpfOk = await getUserByCpfDB(cpf);
        if (cpfOk.rowCount > 0) return res.status(409).send({message: "CPF já cadastrado!"});
        
        const emailOk = await getUserByEmailDB(email);
        if (emailOk.rowCount > 0) return res.status(409).send({message: "e-mail já cadastrado!"});
        
        const hash = bcrypt.hashSync(password,10);
        await createUserDB(name, cpf, email, hash, phoneNumber);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signIn(req, res){
    const {email, password} = req.body;
    try {
        const user = await getUserByEmailDB(email);
        if (user.rowCount == 0) return res.status(401).send({message: "E-mail não cadastrado!"});

        const passwordOk = bcrypt.compareSync(password, user.rows[0].password);
        if (!passwordOk) return res.status(401).send({message: "Senha incorreta!"});

        const token = uuid();
        await createSessionDB(user.rows[0].id, token);
        
        res.send({token, name: user.rows[0].name});
    } catch (error) {
        res.status(500).send(error.message);
    }

}