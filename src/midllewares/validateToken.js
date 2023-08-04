import { db } from "../database/databaseConnection.js";


export default async function validateToken(req, res, next){
    //headers: {Authorization: BEARER token}
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(401)
    try{
        const user = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);
        if(user.rowCount === 0){
            return res.sendStatus(401)
        }
        res.locals.userId = user.rows[0].userId;
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}