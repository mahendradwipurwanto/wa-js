// module
import express from "express"
import cors from "cors"
import "express-async-errors"
import http from "http"

// files
import "./loadEnv.mjs"
import apiRoute from "./routes/api.mjs"

// const
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "/api/v1"

globalThis.api_key = null

const app = express()

const server = http.createServer(app);
import {
    Server
} from "socket.io";
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user is connected');

    socket.on('message', (message) => {
        console.log(`message from ${socket.id} : ${message}`);
    })

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
    })
})

export {
    io
};

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: true
}));

// Load the /posts routes
app.use(HOST, apiRoute)

// Global error handling
// app.use((err, _req, res, next) => {
//     res.status(500).json({
//         error: "Uh oh! An unexpected error occured."
//     })
// })

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})