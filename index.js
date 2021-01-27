const PORT = process.env.PORT || 5000;
const express = require('express')
const archives = require("./public/scripts/archiveclass.js").blogList
let app = express()

app.use(express.static(__dirname + "/public"))


app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))
app.get("/archive", (req, res) => {
    let obj = {"archive": []}
    for (item of archives) {
	  obj.archive.push({"title": item.title})
}
res.json(obj)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


// how it works..
// did browswerify archives.js > bundle.js
// included bundle where archives.js previously were
// changed href on cards to include stub query

//TODO
// for some reason heroku remote doesn't work still
// only link that doesnt work is going from matching game > archive post
// I think this is because it is looking for document.title = home OR archive 

