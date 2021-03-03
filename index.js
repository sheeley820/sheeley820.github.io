const express = require('express')
let app = express()
const bodyParser = require("body-parser")
const mongodb = require("mongodb")
const {buildBlogPostObject} = require('./schema.js')
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI_BLOG

let MongoClient = mongodb.MongoClient
const DB_NAME = 'Videogameblog'
const client = new MongoClient(URL);
let listOfBlogs = {}
let users = ["chris", "chris123"]

const requestHeaderCallback = function(req, res, next) {
            let origin = req.headers.origin || '*';
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        }

console.logList = (...args) => {
    for(arg of args) {
        console.log(arg)
    }
}

app.use(express.static(__dirname + "/public"),
        bodyParser.urlencoded({extended: true}),
        bodyParser.json(),
        requestHeaderCallback
)

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

client.connect(function(err) {
    console.log('Connected successfully to server');
  
    const db = client.db(DB_NAME);
    const archiveCollection = db.collection("archives")
    const buildArchiveElements = () => {
        archiveCollection.find({}).toArray(function(err, docs) {
            listOfBlogs = docs
        })
    }

    buildArchiveElements()

    app.route("/archive").get((req, res) => {
        console.logList(`Params: ${req.query}`, `PostID: ${req.query.postID}`, `Request: ${req}`)

        if (req.query.postID) {
            res.send(listOfBlogs.filter(post => post._id == req.query.postID))
        } else {
            res.send(listOfBlogs)
        }
    }).post((req, res) => {
        const post = buildBlogPostObject(req.body)
          
        archiveCollection.insertOne(post, function(err, result) {
            console.logList(result, "Inserted Document")
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
                    console.error("user not found")
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

})

app.post('/userCheck', (req, res) => {
    let lowUser = req.body.userCheck.toLowerCase()
    console.logList(`User: ${req.body.userCheck}`, `Body:`, req.body)

    let isUser = users.find(item => item == lowUser)
    res.status(isUser ? 422 : 200)
    res.json({ "usernameIsValid" : !isUser })
})

app.post("/form", (req, res) => {
    res.json(req.body)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

