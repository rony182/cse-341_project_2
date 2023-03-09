const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getGames= async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('project2').collection("games").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getGame= async (req, res, next) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('project2')
      .collection("games")
      .find({ _id: gameId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createGame= async (req, res, next) => {
  try {
    const game = {
      gameDate: req.body.gameDate,
      time: req.body.time,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      location: req.body.location,
      attendance: req.body.attendance,
      finalScore: req.body.finalScore,
      recap: req.body.recap
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("games")
      .insertOne(game);
    if (response.acknowledged) {
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

const updateGame= async (req, res, next) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const game = {
      gameDate: req.body.gameDate,
      time: req.body.time,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      location: req.body.location,
      attendance: req.body.attendance,
      finalScore: req.body.finalScore,
      recap: req.body.recap
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("games")
      .replaceOne({ _id: gameId }, game);
    console.log(response);
    if (response.modifiedCount > 0) {
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
    const gameId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("games")
      .deleteOne({ _id: gameId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the game."
        );
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
