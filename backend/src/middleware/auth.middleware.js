const usermodel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const redis = require('../config/cache')

async function verifyuser(req,res,next){
const token = req.cookies.token 
if(!token){
    return res.status(400).json({
        message : "token expire"
    })
}
const istokenBlacklist = await redis.get(token)
if(istokenBlacklist){
       return res.status(400).json({
        message : "token blacklist"
    })
}
let decoded 
try{
decoded = await jwt.verify(token , process.env.JWT_SECRET)
res.user = decoded 
next()

}
catch(err){
       return res.status(400).json({
        message : "unauthorised acess"
    })
}

}

module.exports = verifyuser


