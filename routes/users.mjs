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

        const collection = db.collection("users")
        const cek = await collection.find({
            sub: sub
        }).toArray()

        if (cek && cek?.length > 0) {
            return res.success(response, cek, "Success")
        }

        const result = await collection.insertOne({
            sub: sub,
            credential: credential
        })

        res.created(response, result, "User Created")
    } catch (error) {
        return res.error(response, error)
    }

})

// Get a list of 50 posts
router.get("/", async (request, response) => {
    const collection = db.collection("users")
    const results = await collection.find({})
        .limit(50)
        .toArray()

    res.success(response, results)
})

// Get a single post
router.get("/:sub", async (request, response) => {
    const collection = db.collection("users")
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

    const collection = db.collection("users")
    const result = await collection.updateOne(query, updates)

    res.success(response, result)
})

// Deconste an entry
router.delete("/:id", async (request, response) => {
    const query = {
        _id: ObjectId(request.params.id)
    }

    const collection = db.collection("users")
    const result = await collection.deleteOne(query)

    res.success(response, result)
})

// Deconste an entry
router.get("/api-key", async (request, response) => {
    res.success(response, {
        api_key: globalThis.api_key
    })
})

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router
