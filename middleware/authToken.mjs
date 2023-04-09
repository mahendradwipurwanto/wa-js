import db from "../services/mongodb.mjs"
import {checkApiKey} from "../middleware/apiKeyChecker.mjs"

async function authenticateToken(req, res, next) {
    let collection = await db.collection("api_keys")
    
    const providedKey = req.headers['x-api-key']
    if (!providedKey) {
        res.status(401).json({
            error: 'Unauthorized'
        })
        return
    }

    checkApiKey.delete(providedKey)
    
    const query = {
        key: providedKey
    }

    const update = {
        $inc: {
            used: 1
        }
    }

    globalThis.api_key = providedKey

    let result = await collection.findOne(query)

    if (result) {

        await collection.updateOne(query, update)
        next()
    } else {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
}

export default authenticateToken