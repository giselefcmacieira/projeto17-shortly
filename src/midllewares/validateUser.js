import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";


export default async function validateUser(req, res, next){
    //body: {email: "joao@driven.com.br", password: "driven"}
    const {email, password} = req.body;
    try{
        const user = await db.query(`SELECT password, id FROM users WHERE email = $1`, [email])
        if(user.rowCount === 0) return res.sendStatus(401)
        if(bcrypt.compareSync(password, user.rows[0].password)){
            res.locals.userId = user.rows[0].id
            return next()
        }else{
            return res.sendStatus(401)
        }
    }catch(err){
        return res.status(500).send(err.message);
    }
}