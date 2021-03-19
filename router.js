const { Router } = require('express')
const mongo = require("./mongo")
const {buildBlogPostObject} = require('./schema.js')
require('dotenv').config()
const DB_NAME = process.env.DB_NAME || "test"
let listOfBlogs

function buildConnection() {
    return mongo.getClient()
}

const buildArchiveElements = (collection) => {
    collection.find({}).toArray(function(err, docs) {
        listOfBlogs = docs
    })
}

async function buildRouter(client) {
    console.info('Connected successfully to server');
    let router = new Router()
    let db = await mongo.getDatabase(client, DB_NAME);
    let archiveCollection = await mongo.getCollection(db, process.env.ARCHIVE_COLLECTION)
    buildArchiveElements(archiveCollection)

    
    router.delete('/deleteAllArchives', (req, res) => {
        //removes ALL documents
        archiveCollection.deleteMany({ }, () => "")
        res.status(200)
        res.send(200);
    })

    router.post("/form", (req, res) => {
        res.json(req.body)
    })

    router.get("/", (req, res) => res.sendFile(__dirname + "index.html"))

    router.get("/message", (req, res) => {
        res.json({ "message": "Hello!" })
    })
    
    router.get("/archive", (req, res) => {
        // console.logList(`Params: ${req.query}`, `PostID: ${req.query.postID}`, `Request: ${req}`)
        if (req.query.postID) {
            let filteredBlog = listOfBlogs.filter(post => post._id == req.query.postID)
            
            if(filteredBlog.length == 1) {
                res.status(200)
                res.send(filteredBlog[0])
            } else {
                res.status(200)
                res.send(listOfBlogs)
            }
        } else {
            res.status(400)
            res.send({})
        }
    })
    
    router.post("/archive", (req, res) => {
        const post = buildBlogPostObject(req.body)
        
        archiveCollection.insertOne(post, function(err, result) {
            console.log(`Result: ${result.ops[0]}`)
            buildArchiveElements(archiveCollection)
            if(result.result.ok == 1) {
                res.status(200).json({
                    "result": "ok",
                    "post": result.ops[0]
                })
            } else {
                res.status(400).json({
                    "result": "error",
                    "post": { "error": err}
                })
            }
        })
    })

    return router
}

module.exports = {
    buildConnection: buildConnection,
    buildRouter: buildRouter
}
