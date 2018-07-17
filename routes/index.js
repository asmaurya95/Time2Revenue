var express = require('express');
var router = express.Router();
var User = require('../models/user');
var db = require('../models/projects');
var projectID = "f14060e015f2d8da00a00e10f2002a9d";

module.exports = function(passport) {

  /* GET Home Page */
  router.get('/',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      res.render('welcome', { title: 'Time2Revenue' });
    }
  );

  /*GET add new project page */
  router.get('/newproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      res.render('newproject', { title: 'Time2Revenue' });
    }
  );

  /*POST add new project page*/
  router.post('/newproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
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
      })
  );

  /*GET Edit Project Page */
  router.get('/editproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      res.render('editproject', {});
    }
  );

  /*POST Edit Project Page*/
  router.post('/editproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      var projectData = req.body;
      db.updateDocument(projectData, projectID, function(err, res) {
        if(err) console.log('No Update');
        console.log('Updated Succesfully')
      });
      res.send(projectData);
    }
  );

  return router;
};
