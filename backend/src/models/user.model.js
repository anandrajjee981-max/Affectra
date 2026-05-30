const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
username : {
    type : String,
    unique : true ,
    required : [true , "username is required"]
},
email : {
    type : String ,
    unique : true , 
    required : [true , "email is req"]
},
password : {
    type : String , 
    required : [true , "password is req "],
    select:false  // if we have to user detail then yey data nhi jaye agr lee lee jana hain khi suppose login pay to select + password krna hoga
    //abb say hamesha usermodel mein yey syntax rkhna 
}



})
const usermodel = mongoose.model("user", userschema)
module.exports = usermodel

