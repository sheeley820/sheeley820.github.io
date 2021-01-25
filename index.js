const PORT = process.env.PORT || 5000;
const express = require('express')
let app = express()


app.use(express.static(__dirname + "/public"))


app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))
app.get("/archive")

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


