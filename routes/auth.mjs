import express from "express"
import db from "../services/mongodb.mjs"
import {
    res
} from "../systems/responseHandler.mjs";
import generateApiKey from "../systems/apiKeys.mjs"

const router = express.Router()

// Generate api key
router.post("/generate-api-key", async (request, response) => {
    try {

        const apiKey = generateApiKey()

        let collection = await db.collection("api_keys")

        const payload = {
            key: apiKey,
            used: 0,
            date: new Date()
        }
        let result = await collection.insertOne(payload)

        if (result) {
            res.success(
                response,
                payload,
                "Berhasil membuat API KEY"
            )
        } else {
            res.error(response, "There is something wrong")
        }
    } catch (error) {
        res.error(response, error)
    }
})

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router