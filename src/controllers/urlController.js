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

export async function openUrl (req, res){
    //req.params: {shortUrl: 'cfçlhokgn548gdb578dg'}
    const {shortUrl} = req.params
    try{
        const url = await db.query(`SELECT "originalUrl", "visitCount" FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        const visitCount = url.rows[0].visitCount + 1
        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [visitCount, shortUrl])
        return res.redirect(url.rows[0].originalUrl);
    }catch(err){
        return res.status(500).send(err.message)
    }
}