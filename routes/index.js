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

  /*Dashboard page router*/
    router.get('/dashboard.pug',
      require('connect-ensure-login').ensureLoggedIn(),
      (req,res) => {
        res.render('dashboard.pug',{});
      }
    );

    /*combined page router*/
    router.get('/combined.pug',
      require('connect-ensure-login').ensureLoggedIn(),
    (req,res) => {
        res.render('combined.pug',{});
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
        res.render('editproject', { cust_name: doc.cust_name,
                                    proj_name: doc.proj_name,
                                    contr_typ: doc.contr_typ,
                                    contr_end: doc.contr_end,
                                    Dis_plan_strdt: doc.Dis_plan_strdt,
                                    Dis_plan_enddt: doc.Dis_plan_enddt,
                                    Dis_act_strdt: doc.Dis_act_strdt,
                                    Dis_act_enddt: doc.Dis_act_enddt,
                                    Dis_comment: doc.Dis_comment,
                                    Des_plan_strdt: doc.Des_plan_strdt,
                                    Des_plan_enddt: doc.Des_plan_enddt,
                                    Des_act_strdt: doc.Des_act_strdt,
                                    Des_act_enddt: doc.Des_act_enddt,
                                    Des_comment: doc.Des_comment,
                                    env_plan_strdt: doc.env_plan_strdt,
                                    env_plan_enddt: doc.env_plan_enddt,
                                    env_act_strdt: doc.env_act_strdt,
                                    env_act_enddt: doc.env_act_enddt,
                                    env_comment: doc.env_comment,
                                    Dev_plan_strdt: doc.Dev_plan_strdt,
                                    Dev_plan_enddt: doc.Dev_plan_enddt,
                                    Dev_act_strdt: doc.Dev_act_strdt,
                                    Dev_act_enddt: doc.Dev_act_enddt,
                                    Dev_comment: doc.Dev_comment,
                                    tes_plan_strdt: doc.tes_plan_strdt,
                                    tes_plan_enddt: doc.tes_plan_enddt,
                                    tes_act_strdt: doc.tes_act_strdt,
                                    tes_act_enddt: doc.tes_act_enddt,
                                    tes_comment: doc.tes_comment,
                                    golv_plan_strdt: doc.golv_plan_strdt,
                                    golv_plan_enddt: doc.golv_plan_enddt,
                                    golv_act_strdt: doc.golv_act_strdt,
                                    golv_act_enddt: doc.golv_act_enddt,
                                    golv_comment: doc.golv_comment,
                                    ldmp_plan: doc.ldmp_plan,
                                    ldmp_act: doc.ldmp_act,
                                    mp_plan: doc.mp_plan,
                                    mp_act: doc.mp_act,
                                    ldimp_plan: doc.ldimp_plan,
                                    ldimp_act: doc.ldimp_act,
                                    imp_plan: doc.imp_plan,
                                    imp_act: doc.imp_act,
                                    pm_plan: doc.pm_plan,
                                    pm_act: doc.pm_act});
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
