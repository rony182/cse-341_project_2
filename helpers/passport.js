

const passport = require("passport");
const mongodb = require("../db/connect");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      email: "email",
      password: "password",
    },
    async (email, password, done) => {
      try {
        const existingUser = await mongodb
          .getDb()
          .db("project2")
          .collection("users")
          .findOne({ email: email });
        if (!existingUser) {
          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, existingUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await mongodb
      .getDb()
      .db("project2")
      .collection("users")
      .findOne({ _id: id });
    if (!user) {
      return done(new Error("User not found"));
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
