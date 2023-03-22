const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  experienceYears: {
    type: Number,
    required: true
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
