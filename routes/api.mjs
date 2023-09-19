import express from "express";

import authToken from "../middleware/authToken.mjs";

import authRoute from "./auth.mjs";
import usersRoute from "./users.mjs";
import apiKeyRoute from "./apiKeys.mjs";
import whatsappRoute from "./whatsapp.mjs"
import chatsRoute from "./chats.mjs"

const router = express.Router();

// Load the /auth routes
router.use("/auth", authRoute);

router.use("/users", usersRoute);
router.use("/api-key", apiKeyRoute);
router.use("/whatsapp", authToken, whatsappRoute);
router.use("/chats", authToken, chatsRoute);

// Example route that uses responseHandler
router.get("/", (req, res) => {
  responseHandler(res, { message: "Hello, world!" });
});

export default router;
