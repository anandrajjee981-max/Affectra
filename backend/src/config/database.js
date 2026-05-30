const mongoose = require("mongoose")
function connectdb(){
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("connect db")

})


}
module.exports = connectdb



