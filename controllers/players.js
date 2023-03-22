const { validationResult } = require('express-validator');
const Player = require('../models/Player');
const mongoose = require("mongoose");


const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find({});
    if (players.length === 0) {
      res.status(404).json({ message: "No players found." });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(players);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    if (!player) {
      res.status(404).json({ message: "Player not found." });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(player);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const createPlayer = async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const player = new Player({
      playerName: req.body.playerName,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality,
      experienceYears: req.body.experienceYears,
    });
    const response = await player.save();
    if (response) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the player."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePlayer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const playerId = req.params.id;
    const player = {
      playerName: req.body.playerName,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality,
      experienceYears: req.body.experienceYears,
    };
    const response = await Player.updateOne({ _id: playerId }, player);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the player."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    const response = await Player.deleteOne({ _id: playerId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "Player not found." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
