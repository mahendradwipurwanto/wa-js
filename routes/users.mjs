import express from "express"
import db from "../services/mongodb.mjs"
import {
    ObjectId
}
from "mongodb"
import {
    res
} from "../systems/responseHandler.mjs";

const router = express.Router()

// Get a list of 50 posts
router.get("/", async (request, response) => {
    let collection = await db.collection("users")
    let results = await collection.find({})
        .limit(50)
        .toArray()

    res.success(response, results)
})

// Fetches the latest posts
router.get("/latest", async (request, response) => {
    let collection = await db.collection("users")
    let results = await collection.aggregate([{
            "$project": {
                "author": 1,
                "title": 1,
                "tags": 1,
                "date": 1
            }
        },
        {
            "$sort": {
                "date": -1
            }
        },
        {
            "$limit": 3
        }
    ]).toArray()
    res.success(response, results)
})

// Get a single post
router.get("/:id", async (request, response) => {
    let collection = await db.collection("users")
    let query = {
        _id: ObjectId(request.params.id)
    }
    let result = await collection.findOne(query)

    if (!result) res.notfound("Not found")
    else res.success(response, result)
})

// Add a new document to the collection
router.post("/", async (request, response) => {
    let collection = await db.collection("users")
    let newDocument = request.body
    newDocument.date = new Date()
    let result = await collection.insertOne(newDocument)
    res.saved(response, result)
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

    let collection = await db.collection("users")
    let result = await collection.updateOne(query, updates)

    res.success(response, result)
})

// Delete an entry
router.delete("/:id", async (request, response) => {
    const query = {
        _id: ObjectId(request.params.id)
    }

    const collection = db.collection("users")
    let result = await collection.deleteOne(query)

    res.success(response, result)
})

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router