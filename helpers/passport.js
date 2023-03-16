const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dotenv = require('dotenv');

// configure passport
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// configure session
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: env.MONGODB_URI,
    collection: 'sessions'
  })
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
