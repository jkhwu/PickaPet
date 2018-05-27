//Server CONFIG for FACEBOOK OAuth ONLY!!!!

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var PORT = process.env.PORT || 8080

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.


passport.use(new Strategy({
    clientID: "868174730035988",
    clientSecret: "0c835a217bb683e4537e964aafb97e2a",
    // callbackURL: 'https://salty-bayou-86805.herokuapp.com/test',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
  },
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

//   Strategy.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/fb',
  function (req, res) {
    res.render('home', {
      user: req.user
      // scope: ['emails']
    });
  });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req);
    res.redirect('/fb');
  });

// app.get('/test',
//   function (req, res) {
//     res.send('Testing');
//   });


app.get('/login',
  function (req, res) {
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {
      user: req.user
    });
  });

app.listen(PORT);