const PORT = process.env.PORT || 5000;
const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
let app = express()
const url = process.env.MONGO_URI_BLOG
let MongoClient = mongodb.MongoClient
let {BlogPost, buildBlogPostObject} = require('./schema.js')
const bcrypt = require('bcrypt')
const requestHeaderCallback = function(req, res, next) {
            let origin = req.headers.origin || '*';
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        }


const dbName = 'Videogameblog'
const client = new MongoClient(url);

let listOfBlogs = {}

app.use(express.static(__dirname + "/public"),
        bodyParser.urlencoded({extended: true}),
        bodyParser.json(),
        requestHeaderCallback,
)

client.connect(function(err) {
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
  
    const archiveCollection = db.collection("archives")

    const buildArchiveElements = () => {
        archiveCollection.find({}).toArray(function(err, docs) {
        listOfBlogs = docs
        })
    }
    buildArchiveElements()

    app.get("/archive", (req, res) => {
        console.log(`Params: ${req.query}`)
        console.log(`PostID: ${req.query.postID}`)
        console.log(`Request: ${req}`)
        if (!req.query.postID) {
            res.send(listOfBlogs)
        } else {
            res.send(listOfBlogs.filter((post) => {
                return post._id == req.query.postID
            }))
        }
    })

    //endpoint to insert blogposts to db
    app.post("/archive", (req, res) => {
        const post = buildBlogPostObject(req.body)
          
        archiveCollection.insertOne(post, function(err, result) {
            console.log(result)
            console.log("Inserted Document")
            if(result.result.ok == 1) {
                res.json({
                    "result": "ok",
                    "post": result.ops[0]
                })
            }
            buildArchiveElements()
        })
    })

    //endpoint to delete all archive entries
    app.delete('/deleteAllArchives', (req, res) => {
        //removes ALL documents
        archiveCollection.deleteMany({ })
    })

    app.post('/login' , (req, res) => {
        const userCollection = db.collection("users")
        userCollection.findOne({"username" : req.body.username}, function (err, result) {
            
            if (err) console.error(err)

            console.log(result)

            bcrypt.compare(req.body.password, result.password, function(err, passMatchResult){

                if (result == null) {
                    console.log("user not found")
                    res.sendStatus(400)
                } else if(result.username && passMatchResult) {
                    console.log("username found")
                    return res.sendStatus(200)
                } else {
                    console.log("password doesn't match")
                    res.sendStatus(400)
                }
            }) 
        })        
    })
    
    app.post('/register', (req, res) => {
        const userCollection = db.collection("users")
        const saltRounds = 10;

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            if (err) console.error(err)
            userCollection.insertOne({
                "username" : req.body.username,
                "password" : hash
            }, (err, result) => {
                if (err) console.error(err)
                console.log(result)
                res.sendStatus(200)
            })
        })

    })

});

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

let users = ["chris", "chris123"]

app.post('/userCheck', (req, res) => {
    let user = req.body.userCheck
    console.log(`User: ${user}`)
    console.log(`Body:`)
    console.log(req.body)
    let lowUser = user.toLowerCase()
    let isUser = users.find(item => item == lowUser)
    res.status(isUser ? 422 : 200)
    res.json({ "usernameIsValid" : !isUser })
})

app.post("/form", (req, res) => {
    res.json(req.body)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

