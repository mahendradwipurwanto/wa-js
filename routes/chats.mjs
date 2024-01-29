import express from "express"
import db from "../services/mongodb.mjs"
import {
    res
} from "../systems/responseHandler.mjs";
// import {getSessionsFile} from "../services/wajs.mjs";

const router = express.Router()

router.post('/sendmessage/:phone', async (req, res) => {
    let phone = req.params.phone;
    let message = req.body.message;

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

router.get('/getchatbyid/:phone', async (req, res) => {
    let phone = req.params.phone;
    if (phone == undefined) {
        res.send({
            status: "error",
            message: "please enter valid phone number"
        });
    } else {
        client.getChatById(`${phone}@c.us`).then((chat) => {
            res.send({
                status: "success",
                message: chat
            });
        }).catch(() => {
            console.error("getchaterror")
            res.send({
                status: "error",
                message: "getchaterror"
            })
        })
    }
});

router.get('/getchats', async (req, res) => {
    // console.log(getSessionsFile);
    // await client.getChats().then((chats) => {
    //     res.send({
    //         status: "success",
    //         message: chats
    //     });
    // }).catch(() => {
    //     res.send({
    //         status: "error",
    //         message: "getchatserror"
    //     })
    // })
});

// 404
router.use('*', function (request, response) {
    res.notfound(response, 'what???')
})

export default router
