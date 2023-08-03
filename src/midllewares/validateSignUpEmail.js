import { db } from "../database/databaseConnection.js"


export default async function validateSignUpEmail(req, res, next){
    //body: {name: "João", email: "joao@driven.com.br", password: "driven", confirmPassword: "driven"}
    const {email} = req.body
    try{
        const user = (await db.query(`SELECT id FROM users WHERE email = $1`, [email])).rowCount
        if(user > 0){
            return res.sendStatus(409);
        }
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}