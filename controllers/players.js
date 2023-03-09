const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getPlayers= async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('project2').collection("players").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPlayer= async (req, res, next) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('project2')
      .collection("players")
      .find({ _id: playerId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPlayer= async (req, res, next) => {
  try {
    const player = {
      playerName: req.body.playerName,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality,
      experienceYears: req.body.experienceYears,
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("players")
      .insertOne(player);
    if (response.acknowledged) {
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

const updatePlayer= async (req, res, next) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const player = {
      playerName: req.body.playerName,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality,
      experienceYears: req.body.experienceYears,
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("players")
      .replaceOne({ _id: playerId }, player);
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
    const playerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("players")
      .deleteOne({ _id: playerId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the player."
        );
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
