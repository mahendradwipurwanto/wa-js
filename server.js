const express = require('express');
const fs = require("fs");
const axios = require("axios");
const bodyParser = require("body-parser");
const {
    Client,
    LocalAuth
} = require("whatsapp-web.js");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

process.title = "whatsapp-node-api";
global.client = new Client({
    authStrategy: new LocalAuth()
});

global.authed = false;

//Set Request Size Limit 50 MB
app.use(bodyParser.json({
    limit: "50mb"
}));
// Set up middleware to parse incoming request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// init wa-js
client.on("qr", (qr) => {
    console.log("generate qr");
    fs.writeFileSync("./assets/qrcode.qr", qr);
});

client.on("authenticated", () => {
    console.log("authenticated !");
    authed = true;
    try {
        fs.unlinkSync("./assets/qrcode.qr");
    } catch (err) {}
});

client.on("auth_failure", () => {
    console.log("authenticated process fail !");
    process.exit();
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message", async (msg) => {
    if (config.webhook.enabled) {
        if (msg.hasMedia) {
            const attachmentData = await msg.downloadMedia();
            msg.attachmentData = attachmentData;
        }
        axios.post(config.webhook.path, {
            msg
        });
    }
});
client.on("disconnected", () => {
    console.log("Client is disconnected");
});
client.initialize();

// Define routes
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const chatsRoutes = require('./routes/chats');

// set routes
app.use(function (req, res, next) {
    console.log(req.method + " : " + req.path);
    next();
});
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/chats', chatsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});