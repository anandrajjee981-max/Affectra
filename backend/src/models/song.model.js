const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    emotion: {
      type: String,
      required: true,
    },

    song: {
      type: String,
      required: true,
    },

    songUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);