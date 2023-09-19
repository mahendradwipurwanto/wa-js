import express from "express"
import db from "../services/mongodb.mjs"
import {
    res
} from "../systems/responseHandler.mjs";
import {
    io
} from "../server.mjs";
import createSession from "../services/wajs.mjs";

const router = express.Router()

// Get a list of 50 posts
router.get("/create-session", async (request, response) => {
    const providedKey = request.headers['x-api-key']
    let results = createSession(providedKey);
    io.emit('order-added', results)

    res.success(response, results)
})

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router