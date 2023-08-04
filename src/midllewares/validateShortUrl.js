import { db } from "../database/databaseConnection.js";


export default async function validateShortUrl (req, res, next){
    //res.locals: {userId: 1}
    //req.params: {id: 1}
    const {id} = req.params
    const {userId} = res.locals
    try{
        const urlInf = await db.query(`SELECT "userId" FROM urls WHERE id = $1`, [id]);
        if(urlInf.rowCount === 0){
            return res.sendStatus(404)
        }
        const shortUrlUserId = urlInf.rows[0].userId;
        if(shortUrlUserId !== userId){
            return res.sendStatus(401)
        }
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}