import { db } from "../database/databaseConnection.js"


export default async function validateUrlId (req, res, next){
    //req.params = {id: 1}
    const {id} = req.params;
    try{
        const urlInf = await db.query(`SELECT id, "shortUrl", "originalUrl" FROM urls WHERE id = $1`, [id]);
        if(urlInf.rowCount === 0) return res.sendStatus(404);
        res.locals.urlInf = urlInf.rows[0] //{id: 1, shortUrl: soivfn5246sxofvn, originalUrl = "https://"}
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}