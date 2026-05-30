const express = require("express")
const app = express()
app.use(express.json())
const authroute = require('./routes/auth.routes')
const songroute = require('./routes/song.routes')
const cookieparser = require("cookie-parser")
const cors = require('cors')
app.use(cors({
    credentials : true ,
    origin : " http://localhost:5173"
}))
app.use(cookieparser())
app.use("/api/auth",authroute)
app.use("/api/song",songroute)

module.exports = app
