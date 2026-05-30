const express = require("express")
const authroute = express.Router()
const verifyuser = require('../middleware/auth.middleware')
const authcontroller = require('../controller/auth.controller')
authroute.post("/register",authcontroller.register)
authroute.post("/login",authcontroller.login)
authroute.get("/getme",verifyuser , authcontroller.getme)
authroute.post("/logout",verifyuser,authcontroller.logout)

module.exports = authroute 
