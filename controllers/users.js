const { validationResult } = require('express-validator');
const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getUsers = async (req, res, next) => {
  try {
    const lists = await User.find().exec();

    if (lists.length === 0) {
      console.log(lists);
      return res.status(404).json({ error: "No user found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get users" });
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user" });
  }
};

const logUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const password = req.body.password;
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const passwordMatch = await comparePassword(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.SECRET_KEY);
    existingUser.token = token;
    await existingUser.save();
    res.cookie('token', token);
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log in user" });
  }
};




const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const password = await encryptPassword(req.body.password);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password,
    });

    const response = await user.save();

    if (response) {
      res.status(201).json({ user });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userId = req.params.id;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.password) {
      req.body.password = await encryptPassword(req.body.password);
    }

    existingUser.firstName = req.body.firstName;
    existingUser.lastName = req.body.lastName;
    existingUser.email = req.body.email;
    existingUser.password = req.body.password || existingUser.password;

    const response = await existingUser.save();

    if (response) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Failed to update user" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const response = await User.deleteOne({ _id: userId });

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
  logUser,
};


const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

