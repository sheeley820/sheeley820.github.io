const express = require('express')
const bodyParser = require("body-parser")
const mongodb = require("mongodb")
const {buildBlogPostObject} = require('./schema.js')
const bcrypt = require('bcrypt')
const Strategy = require("passport-local").Strategy
const passport = require('passport')
const ObjectId = require('mongodb').ObjectID
const expressSession = require('express-session')

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI_BLOG

let app = express()
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
        requestHeaderCallback,
        expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }),
        passport.initialize(),
        passport.session()
)

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

client.connect(function(err) {
    
    const db = client.db(DB_NAME);
    const archiveCollection = db.collection("archives")
    const userCollection = db.collection("users")

    
    passport.use(new Strategy(
        function(username, password, cb) {
            let userQuery = { "username" : username }
            userCollection.findOne(userQuery), (response) => {
            if (response == null) { return cb(null, false); }
            //BCrypt
            let passwordMatches = false;
            bcrypt.compare(password, response.password, (err, passMatchResult) => {
                if (err) console.log(err)
                passMatches = passMatchResult
            })

            if (!passwordMatches) { return cb(null, false); }

            return cb(null, user);
          }
        }
    ))

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
      });
      
      passport.deserializeUser(function(id, cb) {
            let userQuery = { "_id" : new ObjectId(id) }
            userCollection.findOne(userQuery), (response) => {
            if (response == null) { return cb(null, false); }
            return cb(null, user);
          }
      });
    console.log('Connected successfully to server');

    app.post('/login' ,   passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
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



app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

