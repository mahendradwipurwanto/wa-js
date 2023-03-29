import db from "../services/mongodb.mjs"

export const checkApiKey = {
    delete: async function(apiKey) {
        let collection = await db.collection("api_keys")
    
        // Set the date for 7 days ago
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
        // Query
        const query = {
            date: {
                $lt: sevenDaysAgo
            },
            used: 0,
            key: {
                $ne: apiKey
            }
        }
    
        let deleted = await collection.deleteMany(query)
    }
}