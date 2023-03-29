// module
import express from "express"
import cors from "cors"
import "express-async-errors"

// files
import "./loadEnv.mjs"
import apiRoute from "./routes/api.mjs"

// const
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "/api/v1"

const app = express()

app.use(cors())
app.use(express.json())

// Load the /posts routes
app.use(HOST, apiRoute)

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).json({
        error: "Uh oh! An unexpected error occured."
    })
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})