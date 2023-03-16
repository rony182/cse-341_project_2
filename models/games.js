const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
  finalScore: {
    type: String,
    required: true,
  },
  recap: {
    type: String,
    required: false,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
