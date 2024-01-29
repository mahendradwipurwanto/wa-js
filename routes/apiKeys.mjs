import express, {
    response
} from "express"
import db from "../services/mongodb.mjs"
import generateApiKey from "../systems/apiKeys.mjs"
import {
    res
} from "../systems/responseHandler.mjs";

const router = express.Router()

// Generate api key
router.post("/generate-api-key", async (request, response) => {

    const {
        sub
    } = request.body

    if (!sub) {
        return res.badrequest(response, 'All fields are required')
    }
    
    try {
        const apiKey = generateApiKey()
    
        const collection = db.collection("api_keys")
    
        const cek = await collection.find({
            sub: sub
        }).toArray()
        
        if (cek && cek?.length > 0) {
            return res.duplicate(response, "Already exist", cek[0])
        }
    
        const payload = {
            sub: sub,
            key: apiKey,
            used: 0,
            date: new Date()
        }
        const result = await collection.insertOne(payload)
    
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

router.get("/:sub", async (request, response) => {
    const collection = db.collection("api_keys")
    const results = await collection.findOne({
        sub: request.params.sub
    })

    res.success(response, results)
})

// Get a list of 50 posts
router.get("/", async (request, response) => {
    const collection = db.collection("api_keys")
    const results = await collection.find({})
        .limit(50)
        .toArray()

    res.success(response, results)
})

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router
