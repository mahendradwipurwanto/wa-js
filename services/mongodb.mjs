import {
    MongoClient
} from "mongodb"

const connectionString = process.env.DATABASE_URI_MONGO || "mongodb://localhost:27017"
const dbName = process.env.DATABASE_NAME_MONGO || null
const client = new MongoClient(connectionString)

let conn
try {
    console.log("connecting to mongodb...")
    conn = await client.connect()
    if(conn){
        console.log("connected to mongodb")
    }
} catch (e) {
    console.error(e)
}
let db = conn.db(dbName)

export default db
