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
const passport = require("passport")
var GitHubStrategy = require('passport-github').Strategy;



app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    let origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors())
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://hidden-shore-45779.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      if (err) {
          return console.error(err)
      }
        return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


const dbName = 'Videogameblog'
const client = new MongoClient(url);

// object to hold blog posts from database
let listOfBlogs = {}

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

app.route('/auth/github')
    .get(passport.authenticate('github'))

app.route('/auth/github/callback')
    .get(passport.authenticate('github', { failureRedirect: '/' }), (req,res) => {
    req.session.user_id = req.user.id
    res.redirect('/userHome');
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

