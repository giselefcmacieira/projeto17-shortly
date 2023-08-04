import { nanoid } from "nanoid";
import { db } from "../database/databaseConnection.js";

export async function createShortUrl (req, res){
    //body: {"url": "https://..."}
    //headers: {Authorization: BEARER token}
    //res.status(201).send({"id": 1,"shortUrl": "a8745bcf"})
    const {url} = req.body;
    const shortUrl = nanoid();
    const {userId} = res.locals;
    const visitCount = 0;
    try{
        await db.query(`INSERT INTO urls ("userId", "originalUrl", "shortUrl", "visitCount") 
        VALUES ($1, $2, $3, $4)`,
        [userId, url, shortUrl, visitCount])
        return res.status(201).send({id: userId, shortUrl})
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function getUrlInfById (req, res){
    //res.status(200).send({"id": 1, "shortUrl": "bd8235a0", "url": "https://..."})
    //req.params = {id: 1}
    const {urlInf} = res.locals //{id: 1, shortUrl: soivfn5246sxofvn, originalUrl = "https://"}
    const {id, shortUrl, originalUrl} = urlInf
    return res.status(200).send({id, shortUrl, originalUrl});
}