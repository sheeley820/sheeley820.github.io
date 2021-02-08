const PORT = process.env.PORT || 5000;
const express = require('express')
const archives = require("./public/scripts/archiveclass.js").blogList
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
let app = express()
const cors = require('cors')
const url = process.env.MONGO_URI_BLOG
let MongoClient = mongodb.MongoClient
let BlogPost = require('./schema.js').BlogPost


app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const dbName = 'Videogameblog'
const client = new MongoClient(url);

client.connect(function(err) {
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
  
    const archiveCollection = db.collection("archives")

    app.get("/archive", (req, res) => {
        archiveCollection.find({}).toArray(function(err, docs) {
            res.json(docs)
        })
    })

    app.post("/archive", (req, res) => {
        const post = new BlogPost({
            title: req.body.title,
            body: req.body.body,
            imgURL: req.body.imgURL,
            tags: req.body.tags,
            date: Date.now()
          })
        //   res.json(JSON.stringify(post))
          
        archiveCollection.insertOne(post, function(err, result) {
            console.log(result)
            console.log("Inserted Document")
            res.json(JSON.stringify(result))
        })
    })
  });




app.use(function(req, res, next) {
    let origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors())


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

