const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  coachName: {
    type: String,
    required: true,
  },
  homeCity: {
    type: String,
    required: true,
  },
  foundationYear: {
    type: Number,
    required: true,
  },
  stadiumName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;