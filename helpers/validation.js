const { check } = require('express-validator');

 
const userCreation = [
  check("firstName", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("lastName", "lastname is required").not().isEmpty(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter"),
];

const teamCreation = [
  check("teanName", "Team name is required").not().isEmpty(),
  check("coachName", "Coach name is required").isString().isEmpty(),
  check("homeCity", "Home city is required").isString().isEmpty(),
  check("foundationYear")
    .notEmpty()
    .withMessage("Foundation year is required.")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      "Foundation year must be a valid year between 1900 and the current year."
    ),
  check("stadiumName", "Stadium name is required").isString().isEmpty(),
  check("capacity", "Capacity is required").notEmpty().isNumeric(),
  check("division", "Division is required").isString().isEmpty(),
];

const playerCreation = [
  check("playerName", "Player name is required").not().isEmpty(),
  check("position", "Position is required").isString().isEmpty(),
  check("height", "Height is required").notEmpty().isNumeric(),
  check("weight", "Weight is required").notEmpty().isNumeric(),
  check("birthdate", "Birthdate is required").notEmpty().isDate(),
  check("nationality", "Nationality is required").isString().isEmpty(),
  check("experienceYears", "Experience years is required")
    .notEmpty()
    .isNumeric(),
];

const gameCreation = [
  check("homeTeam", "Home team is required").notEmpty(),
  check("awayTeam", "Away team is required").notEmpty(),
  check("gameDate", "Game date is required").notEmpty().isDate(),
  check("time", "Time is required and must be in HH:MM format.")
    .notEmpty()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  check("location", "Location is required").notEmpty().isString(),
  check("attendance", "Attendance is required").notEmpty().isNumeric(),
  check("finalScore", "Final score is required").notEmpty().isString(),
  check("recap", "Recap is required").notEmpty().isString(),
];
      

module.exports = {
    userCreation, teamCreation , playerCreation, gameCreation
}