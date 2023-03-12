const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getTeams= async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('project2').collection("teams").find();
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json({ error: "No team found" });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


const getTeam = async (req, res, next) => {
  try {
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('project2')
      .collection('teams')
      .find({ _id: teamId })
      .toArray();

    if (result.length === 0) {
      // If no team is found, return a 404 error
      return res.status(404).json({ message: 'Team not found' });
    }

    // If a team is found, return it as JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};


const createTeam = async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const team = {
      teamName: req.body.teamName,
      coachName: req.body.coachName,
      homeCity: req.body.homeCity,
      foundationYear: req.body.foundationYear,
      stadiumName: req.body.stadiumName,
      capacity: req.body.capacity,
      division: req.body.division,
    };
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("teams")
      .insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the team.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeam= async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const teamId = new ObjectId(req.params.id);
    const team = {
      teamName: req.body.teamName,
      coachName: req.body.coachName,
      homeCity: req.body.homeCity,
      foundationYear: req.body.foundationYear,
      stadiumName: req.body.stadiumName,
      capacity: req.body.capacity,
      division: req.body.division,
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("teams")
      .replaceOne({ _id: teamId }, team);
    console.log(response);
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
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection('teams')
      .deleteOne({ _id: teamId }, true);

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
