import uuidv4 from "uuid"
import crypto from "crypto"

function generateRandomString(length = 10) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result
}

function generateUuid() {
    return uuidv4()
}

function hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex')
}

export default functions