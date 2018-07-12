var express = require('express');
var router = express.Router();
var User = require('../models/user');
var db = require('../models/projects');

module.exports = function(passport) {

  /* GET Home Page */
  router.get('/',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
      res.render('welcome', { title: 'Time2Revenue' });
    }
  );

  /*GET add new project page */
  router.get('/newproject',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
      res.render('newproject', { title: 'Time2Revenue' });
    }
  );

  /*POST add new project page*/
  router.post('/newproject',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
      var projectData = req.body;
      db.insertDocument(projectData);
      res.send(projectData);
    }
  );

  /* GET Login page. */
  router.get('/login', function(req, res) {
    res.render('login', { title: 'Time to Revenue' });
    }
  );

  /* POST Login page */
  router.post('/login',
    passport.authenticate('local', {
        failureRedirect : '/login',
        successRedirect : '/',
        failureFlash : true,
      }
    )
  );

  return router;
};
