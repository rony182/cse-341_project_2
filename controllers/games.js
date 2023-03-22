const { validationResult } = require('express-validator');
const Game = require('../models/Game');

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    if (games.length === 0) {
      res.status(404).json({ message: "No Games found." });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(games);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (!game) {
      res.status(404).json({ message: "Game not found." });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(game);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createGame = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const game = new Game({
      gameDate: req.body.gameDate,
      time: req.body.time,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      location: req.body.location,
      attendance: req.body.attendance,
      finalScore: req.body.finalScore,
      recap: req.body.recap,
    });
    const response = await game.save();
    if (response) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the game."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const gameId = req.params.id;
    const game = {
      gameDate: req.body.gameDate,
      time: req.body.time,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      location: req.body.location,
      attendance: req.body.attendance,
      finalScore: req.body.finalScore,
      recap: req.body.recap,
    };
    const response = await Game.findByIdAndUpdate(gameId, game);
    console.log(response);
    if (response) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the game."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const response = await Game.findByIdAndDelete(gameId);
    console.log(response);
    if (response) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "Game not found." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
};
