const songmodel = require("../models/song.model");
const songUpload = require("../middleware/song.middleware");

async function submitsong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No song file uploaded",
      });
    }

    const { emotion = "Neutral" } = req.body;

    const uploadedSong = await songUpload(
      req.file.buffer,
      req.file.originalname
    );

    const song = await songmodel.create({
      emotion,
      song: uploadedSong.songTitle,
      songUrl: uploadedSong.url,
    });

    return res.status(201).json({
      success: true,
      data: song,
    });
  } catch (error) {
    console.error("Song Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getsong(req, res) {
  try {
    const { emotion } = req.query;

    const songs = await songmodel.find({
      emotion,
    });

    if (songs.length === 0) {
      return res.status(404).json({
        message: "No songs found",
      });
    }

    return res.status(200).json({
      message: "Your songs",
      songs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}



module.exports = { submitsong , getsong };