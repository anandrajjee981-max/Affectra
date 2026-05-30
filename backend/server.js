require("dotenv").config()
const app = require('./src/app')
const connectdb = require('./src/config/database')
connectdb()

app.listen(3000)