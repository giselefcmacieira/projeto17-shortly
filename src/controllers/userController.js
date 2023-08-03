import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";

//import { v4 as uuid } from "uuid";

export async function signUp (req, res){
    //body: {name: "João", email: "joao@driven.com.br", password: "driven", confirmPassword: "driven"}
    const {name, email, password} = req.body
    const passwordHash = bcrypt.hashSync(password, 10);
     try{
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash])
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message)
    }
}