var express = require('express');
var router = express.Router();
var User = require('../models/user');
var db = require('../models/projects');
var proj_name;

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
      res.redirect('/');
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
      db.getDocument(proj_name, function(err, doc) {
        console.log(doc);
        res.render('editproject', { cust_name: doc.cust_name, proj_name: doc.proj_name });
      });
    }
  );

  /*POST Edit Project Page*/
  router.post('/editproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      db.getDocument(proj_name, function(err, doc) {
          var projectData = req.body;
          db.updateDocument(projectData, doc._id, function(err, res) {
            if(err) console.log('No Update');
            console.log('Updated Succesfully')
          });
          res.redirect('/');
      });
    }
  );

  /*GET Existing Projects Page*/
  router.get('/edit',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      db.getNames(function(err, doc){
          console.log(doc);
          res.render('edit', { projlist: doc});
      });
    }
  );

  /*POST Existing Projects Page*/
  router.post('/edit',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager'])],
    function(req, res) {
      console.log(req.body);
      proj_name = req.body.proj_name;
      res.redirect('/editproject');
    }
  );

  return router;
};
