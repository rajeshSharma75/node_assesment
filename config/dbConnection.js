
const { MongoClient } = require('mongodb');

var mongoUrl  = process.env.MONGO_URL;
var dbName    = process.env.DATABASE;

const client = new MongoClient(mongoUrl);
let db;
let isConnected = false;

async function connectToMongoDB() {
    if (!isConnected) {
        await client.connect();
        db = client.db(dbName); 
        isConnected = true;
    }
    return db;
}

module.exports = { connectToMongoDB };




