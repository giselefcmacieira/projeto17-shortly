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
    return res.status(200).send({id, shortUrl, url: originalUrl});
}

export async function openUrl (req, res){
    //req.params: {shortUrl: 'cfçlhokgn548gdb578dg'}
    const {shortUrl} = req.params
    try{
        const url = await db.query(`SELECT "originalUrl", "visitCount" FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if(url.rowCount === 0){
            return res.sendStatus(404)
        }
        const visitCount = url.rows[0].visitCount + 1
        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [visitCount, shortUrl])
        return res.redirect(url.rows[0].originalUrl);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function deleteShortUrl (req, res){
    //req.params: {id: 1}
    //res.sendStatus(204)
    const {id} = req.params
    try{
        await db.query(`DELETE FROM urls WHERE id = $1`, [id])
        return res.sendStatus(204)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function getUserInfo(req, res){
    //res.locals: {userId: 1}
    const {userId} = res.locals
    try{
        const sumVisit = (await db.query(`SELECT SUM(urls."visitCount") AS "visitCountTotal"
        FROM urls
        WHERE urls."userId" = 1`)).rows[0].visitCountTotal //{visitCountTotal: 2}
        const userInf = (await db.query(`SELECT users.name AS "userName", users.id AS "userId", urls.id AS "urlId", urls."shortUrl", urls."originalUrl", urls."visitCount"
        FROM users
        JOIN urls ON urls."userId" = users.id
        WHERE urls."userId" = $1`, [userId])).rows
        const array = userInf.map(inf => {
            return{
                id: inf.urlId,
                shortUrl: inf.shortUrl,
                url: inf.originalUrl,
                visitCount: inf.visitCount
            }
        })
        const obj = {
            id: userInf[0].userId,
            name: userInf[0].userName,
            visitCount: Number(sumVisit),
            shortenedUrls: array
        }
        return res.status(200).send(obj)
    }catch(err){
        return res.status(500).send(err.message)
    }
}