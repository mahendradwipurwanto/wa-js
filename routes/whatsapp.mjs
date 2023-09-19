import express from "express"
import {
    res
} from "../systems/responseHandler.mjs";

const router = express.Router()

router.get('/getchats', async (req, res) => {

    const client = globalThis.SESSIONS.find(sess => sess.key == globalThis.api_key)?.client;
    client.getChats().then((chats) => {
        res.send({ status: "success", message: chats});
    }).catch(() => {
        res.send({ status: "error",message: "getchatserror" })
    })
});

router.post('/sendmessage/:phone', async (req, res) => {
    let phone = req.params.phone;
    let message = req.body.message;

    const client = globalThis.SESSIONS.find(sess => sess.key == globalThis.api_key)?.client;
    console.log(globalThis);
    if (phone == undefined || message == undefined) {
        res.send({
            status: "error",
            message: "please enter valid phone and message"
        })
    } else {
        client.sendMessage(phone + '@c.us', message).then((response) => {
            if (response.id.fromMe) {
                res.send({
                    status: 'success',
                    message: `Message successfully sent to ${phone}`
                })
            }
        });
    }
});

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router