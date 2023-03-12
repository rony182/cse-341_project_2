const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getUsers = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db("project2")
      .collection("users")
      .find();
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ error: "No user found." });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('project2')
      .collection("users")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      // user found, send response with first element in array
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    // handle error
    if (err.message.includes("Argument passed in must be a string of 12 bytes")) {
      // no user found, send error response
      res.status(404).json({ message: 'User not found' });
    } else {
      // some other error occurred, send 500 error response
      res.status(500).json(err);
    }
  }
};


const createUser = async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("users")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the user."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("users")
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the user."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection("users")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      // If no user was deleted, return a 404 error with a message
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
