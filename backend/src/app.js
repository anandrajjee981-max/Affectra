const express = require("express")
const app = express()
app.use(express.json())
const authroute = require('./routes/auth.routes')
const songroute = require('./routes/song.routes')
const cookieparser = require("cookie-parser")
const cors = require('cors')
app.use(cors({
    credentials : true ,
     origin: [
    "http://localhost:5173",
    "https://affectra-koea.onrender.com"
  ]
}))
app.use(cookieparser())
app.use("/api/auth",authroute)
app.use("/api/song",songroute)


const path = require("path");


app.use(express.static(path.join(__dirname, "../public/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

module.exports = app
