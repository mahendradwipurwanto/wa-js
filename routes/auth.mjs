import express from "express";
import db from "../services/mongodb.mjs";
import { res } from "../systems/responseHandler.mjs";
import { io } from "../server.mjs";
import createSession from "../services/wajs.mjs";

const router = express.Router();

// Get a list of 50 posts
router.get("/create-session", async (request, response) => {
    try {
        const providedKey = request.headers['x-api-key'];
        const results = await createSession(providedKey);

        // Emit event after the session is created
        io.emit('order-added', results);

        res.success(response, results);
    } catch (error) {
        console.error(error);
        res.error(response, 'Error creating session');
    }
});

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???');
});

export default router;
