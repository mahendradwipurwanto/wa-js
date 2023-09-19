import express, {
    response
} from "express"
import db from "../services/mongodb.mjs"
import {
    ObjectId
}
from "mongodb"
import {
    res
} from "../systems/responseHandler.mjs";

const router = express.Router()


// register
router.post("/", async (request, response) => {

    const {
        sub,
        credential
    } = request.body

    if (!sub || !credential) {
        return res.badrequest(response, 'All fields are required')
    }

    try {

        const collection = db.collection("devices")
        const cek = await collection.findOne({
            sub: sub
        })

        if (cek) {
            return res.duplicate(response, "Already exist")
        }

        const result = await collection.insertOne({
            sub: sub,
            credential: credential
        })

        res.created(response, result, "device Created")
    } catch (error) {
        res.error(response, error)
    }

})

// Get a list of 50 posts
router.get("/", async (request, response) => {
    const collection = db.collection("devices")
    const results = await collection.find({})
        .limit(50)
        .toArray()

    res.success(response, results)
})

// Get a single post
router.get("/:sub", async (request, response) => {
    const collection = db.collection("devices")
    const query = {
        sub: request.params.sub
    }
    const result = await collection.findOne(query)

    if (!result) res.notfound("Not found")
    else res.success(response, result)
})

// Update the post with a new comment
router.patch("/comment/:id", async (request, response) => {
    const query = {
        _id: ObjectId(request.params.id)
    }
    const updates = {
        $push: {
            comments: request.body
        }
    }

    const collection = db.collection("devices")
    const result = await collection.updateOne(query, updates)

    res.success(response, result)
})

// Deconste an entry
router.delete("/:id", async (request, response) => {
    const query = {
        _id: ObjectId(request.params.id)
    }

    const collection = db.collection("devices")
    const result = await collection.deleteOne(query)

    res.success(response, result)
})

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router