const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_URL);

function getClient(mongoClient = client) {
    return mongoClient.connect()
}

function getDatabase(client, dbName) {
    return (dbName) ? client.db(dbName) : client.db()
}

function getCollection(db, collectionName) {
    return db.collection(collectionName)
}

module.exports = {
    getClient : getClient,
    getDatabase: getDatabase,
    getCollection: getCollection
}