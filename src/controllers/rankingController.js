import { db } from "../database/databaseConnection.js"

export async function getRanking(req, res){
    try{
        const ranking = (await db.query(`SELECT users.id AS id, users.name AS name, COUNT(urls."shortUrl") AS "linksCount", SUM(urls."visitCount") AS "visitCount"
            FROM urls
            LEFT JOIN users ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10`)).rows
        return res.send(ranking)
    }catch(err){
        return res.status(500).send(err.message)
    }
}
