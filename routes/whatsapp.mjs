import express from "express"
import db from "../services/mongodb.mjs"
import {
    ObjectId
} from "mongodb"
import generateApiKey from "../systems/apiKeys.mjs"

const router = express.Router()

// Generate api key
router.post("/generate-api-key", async (req, res) => {
    try {

        const apiKey = generateApiKey()

        let collection = await db.collection("api_keys")

        // Set the date for 7 days ago
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        // Query
        const query = {
            date: {
                $lt: sevenDaysAgo
            },
            used: 0,
            key: {
                $ne: apiKey
            }
        }

        let deleted = await collection.deleteMany(query)

        const payload = {
            key: apiKey,
            used: 0,
            date: new Date()
        }
        let result = await collection.insertOne(payload)

        if (result) {
            res.json(payload).status(200)
        } else {
            res.send("There is something wrong").status(422)
        }
    } catch (error) {
        res.send(error).status(422)
    }
})

// 404
router.use('*', function (req, res) {
    res.send('what???', 404)
})

export default router