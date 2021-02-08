const PORT = process.env.PORT || 5000;
const express = require('express')
const archives = require("./public/scripts/archiveclass.js").blogList
const bodyParser = require("body-parser")
let app = express()
const cors = require('cors')

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


app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

app.get("/archive", (req, res) => {
    let obj = {"archive": []}
    for (item of archives) {
	  obj.archive.push({"title": item.title})
    }
    res.json(obj)
})

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

