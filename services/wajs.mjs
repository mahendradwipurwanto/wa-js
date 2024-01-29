import db from "../services/mongodb.mjs";
import whatsapp from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

globalThis.SESSIONS = [];
globalThis.ACTIVE_SESSIONS = {};

const session = {};

export function createSession(api_key = null) {
    return new Promise(async (resolve, reject) => {
        if (api_key != null) {
            globalThis.api_key = api_key;
        }

        let collection = await db.collection("devices");
        console.log(`Creating session for : ${globalThis.api_key}`);
        const client = new whatsapp.Client({
            restartOnAuthFail: true,
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process', // <- this one doesn't works in Windows
                    '--disable-gpu'
                ],
            },
            authStrategy: new whatsapp.LocalAuth({
                clientId: globalThis.api_key,
            }),
        });

        client.initialize();

        client.on("qr", async (qr) => {
            qrcode.generate(qr, {
                small: true,
            });
            Object.assign(session, {
                qr: qr,
            });

            const query = {
                key: globalThis.api_key,
            };

            const update = {
                qr: qr,
            };

            let result = await collection.updateOne(query, {
                $set: update,
            });

            resolve({ status: true, qr: qr });
        });

        client.on("ready", async () => {
            const query = {
                key: globalThis.api_key,
            };

            const update = {
                connected: true,
            };

            let result = await collection.updateOne(query, {
                $set: update,
            });

            let dataSession = await collection.findOne({
                key: globalThis.api_key,
            });

            Object.assign(dataSession, {
                client: client,
            });

            globalThis.ACTIVE_SESSIONS = dataSession;
        });

        client.on("authenticated", () => {
            resolve({ status: true, message: "Authenticated" });
        });

        client.on("auth_failure", function () {
            io.emit("message", {
                key: key,
                text: "Auth failure, restarting...",
            });
            reject("Authentication failure");
        });

        client.on("disconnected", async (reason) => {
            io.emit("message", {
                key: key,
                text: "Whatsapp is disconnected!",
            });
            client.destroy();
            client.initialize();

            const query = {
                key: globalThis.api_key,
            };

            const update = {
                connected: false,
            };

            console.log({
                process: "disconnect",
                query: query,
                update: update,
            });

            let result = await collection.updateOne(query, {
                $set: update,
            });
        });

        Object.assign(session, {
            key: globalThis.api_key,
            client: client,
            connected: false,
        });

        // Add client to sessions
        globalThis.SESSIONS.push(session);

        console.log({
            process: "sessions",
            sessions: globalThis.SESSIONS,
        });

        const query = {
            key: globalThis.api_key,
        };

        let dataSession = await collection.findOne(query);

        if (!dataSession) {
            await collection.insertOne({
                key: globalThis.api_key,
                connected: false,
            });
        }
    });
}

export default createSession;
