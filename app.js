var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models/user.js');

// passport Stuff
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.findById(id, function (err, user) {
    if (err || user.length == 0)
      done(err);
    else{
      //console.log(user);
      done(null, user);
    }
  });
});


// Configure the Local Strategy for use by passport
/*
  The Local Strategy requires a verify function which receives the credentials
  (username and password) submitted by the user. The function must verify that
  the password is correct  and then invoke 'done' with a user object , which will
  be sent at req.user in route handlers after authentication
*/
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function(username, password, done) {
    db.findByUsername(username, function(err, user) {
      //console.log(user.id);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.value.password != password) { return done(null, false); }
      return done(null, user);
    });
}));

var app = express();

var notAuthorized = {
  redirect: '/dashboard'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('permission', {
  role: 'group',
  notAuthorized: notAuthorized
});

// other middleware setup, add middleware libraries into request handling chain
app.use(logger('dev'));
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//again passport Stuff
app.use(session({ secret: 'some bad text', resave: true, saveUninitialized: true, cookie: { maxAge: 30*10000 } }));
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // persistent login sessions
app.use(flash()); // connect-flash for flash messages stored in session

// add route-handling code to request handling chain
var route = require('./routes/index')(passport);
app.use('/', route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
