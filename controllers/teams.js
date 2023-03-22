const { validationResult } = require('express-validator');
const Team = require('../models/Team');
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const team = new Team({
      teamName: req.body.teamName,
      coachName: req.body.coachName,
      homeCity: req.body.homeCity,
      foundationYear: req.body.foundationYear,
      stadiumName: req.body.stadiumName,
      capacity: req.body.capacity,
      division: req.body.division,
    });
    const savedTeam = await team.save();
    if (savedTeam) {
      res.status(201).json(savedTeam);
    } else {
      res.status(500).json({ error: "Some error occurred while creating the team." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();
    if (teams.length === 0) {
      res.status(404).json({ error: "No team found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(teams);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeam = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId);

    if (!team) {
      // If no team is found, return a 404 error
      return res.status(404).json({ message: 'Team not found' });
    }

    // If a team is found, return it as JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeam = async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const teamId = req.params.id;
    const team = {
      teamName: req.body.teamName,
      coachName: req.body.coachName,
      homeCity: req.body.homeCity,
      foundationYear: req.body.foundationYear,
      stadiumName: req.body.stadiumName,
      capacity: req.body.capacity,
      division: req.body.division,
    };
    const response = await Team.updateOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the team."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const response = await Team.deleteOne({ _id: teamId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      // If no team was deleted, return a 404 error with a message
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};
