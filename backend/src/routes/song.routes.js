const express = require("express")
const songroute = express.Router()
const songcontroller = require('../controller/song.controller')
const multer = require("multer")


const upload = multer({
  storage: multer.memoryStorage()
});

songroute.post("/post",upload.single("song"),songcontroller.submitsong)
songroute.get("/getsong", songcontroller.getsong);




module.exports = songroute
