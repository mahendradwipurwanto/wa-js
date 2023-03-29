import express from "express";

import authToken from "../middleware/authToken.mjs";

import authRoute from "./auth.mjs";
import usersRoute from "./users.mjs";

const router = express.Router();

// Load the /auth routes
router.use("/auth", authRoute);

router.use("/users", authToken, usersRoute);

// Example route that uses responseHandler
router.get("/", (req, res) => {
  responseHandler(res, { message: "Hello, world!" });
});

export default router;
