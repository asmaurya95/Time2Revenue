var express = require('express');
var datetime = require('node-datetime');
var router = express.Router();
var db = require('../models/projects');
var projectName;

module.exports = function(passport) {

  /* GET Home Page */
  router.get('/',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      res.render('welcome', { title: 'Time2Revenue', user: req.user.username });
    }
  );

  /*GET add new project page */
  router.get('/newproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      res.render('newproject', { title: 'Add New Project', user: req.user.username});
    }
  );

  /*POST add new project page*/
  router.post('/newproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      var projectData = req.body;
      db.insertDocument(projectData);
      res.redirect('/');
    }
  );


  /* GET Login page. */
  router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
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

  router.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
  });

  /*GET Edit Project Page */
  router.get('/editproject',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      db.getDocument(projectName, function(err, doc) {
        console.log(doc);
        res.render('editproject', { user: req.user.username,
                                    title: 'Edit Project',
                                    cust_name: doc.cust_name,
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
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      db.getDocument(projectName, function(err, doc) {
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
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      db.getNames(function(err, doc){
          console.log(doc);
          res.render('edit1', { title: 'Existing Projects', projlist: doc, user: req.user.username});
      });
    }
  );

  /*POST Existing Projects Page*/
  router.post('/edit',
    [require('connect-ensure-login').ensureLoggedIn(), require('permission')(['program-manager', 'admin'])],
    function(req, res) {
      console.log(req.body);
      projectName = req.body.proj_name;
      res.redirect('/editproject');
    }
  );

  /*GET Dashboard Page*/
  router.get('/dashboard',
    require('connect-ensure-login').ensureLoggedIn(),
    (req,res) => {
      db.getNames(function(err, doc){
        console.log(doc);
        res.render('dashboard', {title: 'Dashboard', projlist: doc});
      });
  });

  var _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  /*POST Dashboard Page*/
  router.post('/dashboard',
    require('connect-ensure-login').ensureLoggedIn(),
    (req,res) => {
      console.log(req.body);
      var proj_name = req.body.projname;
      var proj_phase = req.body.projphase;

      /*Business logic function*/
      const date_difference = (actdateS, actdateE, plandateS, plandateE) => {
        /*var actdateS = new Date(actdateS.split("-").reverse().join("-"));
        var actdateE = new Date(actdateE.split("-").reverse().join("-"));
        var plandateS = new Date(plandateS.split("-").reverse().join("-"));
        var plandateE = new Date(plandateE.split("-").reverse().join("-"));*/
        var actdiff = dateDiffInDays(new Date(actdateS), new Date(actdateE));
        var plandiff = dateDiffInDays(new Date(plandateS), new Date(plandateE));
        console.log(plandateS);
        console.log(plandateE);
        console.log(plandiff);
        var datediff = [plandiff, actdiff];
        return datediff;
      }

      const svpw_actdifference = (disactdateS, disactdateE, desactdateS, desactdateE, envactdateS, envactdateE, devactdateS, devactdateE, tesactdateS, tesactdateE, golvactdateS, golvactdateE) => {
        /*var disactdateS = new Date(disactdateS.split("-").reverse().join("-"));
        var disactdateE = new Date(disactdateE.split("-").reverse().join("-"));
        var desactdateS = new Date(desactdateS.split("-").reverse().join("-"));
        var desactdateE = new Date(desactdateE.split("-").reverse().join("-"));
        var envactdateS = new Date(envactdateS.split("-").reverse().join("-"));
        var envactdateE = new Date(envactdateE.split("-").reverse().join("-"));
        var devactdateS = new Date(devactdateS.split("-").reverse().join("-"));
        var devactdateE = new Date(devactdateE.split("-").reverse().join("-"));
        var tesactdateS = new Date(tesactdateS.split("-").reverse().join("-"));
        var tesactdateE = new Date(tesactdateE.split("-").reverse().join("-"));
        var golvactdateS = new Date(golvactdateS.split("-").reverse().join("-"));
        var golvactdateE = new Date(golvactdateE.split("-").reverse().join("-"));*/

        var actdiffdis = dateDiffInDays(new Date(disactdateS), new Date(disactdateE));
        var actdiffdes = dateDiffInDays(new Date(desactdateS), new Date(desactdateE));
        var actdiffenv = dateDiffInDays(new Date(envactdateS), new Date(envactdateE));
        var actdiffdev = dateDiffInDays(new Date(devactdateS), new Date(devactdateE));
        var actdifftes = dateDiffInDays(new Date(tesactdateS), new Date(tesactdateE));
        var actdiffgolv = dateDiffInDays(new Date(golvactdateS), new Date(golvactdateE));

        var svpwactdatediff = [actdiffdis,actdiffdes,actdiffenv,actdiffdev,actdifftes,actdiffgolv];
        return svpwactdatediff
      }

      const svpw_plandifference = (displandateS, displandateE, desplandateS, desplandateE, envplandateS, envplandateE, devplandateS, devplandateE, tesplandateS, tesplandateE, golvplandateS, golvplandateE) => {
        /*var displandateS = new Date(displandateS.split("-").reverse().join("-"));
        var displandateE = new Date(displandateE.split("-").reverse().join("-"));
        var desplandateS = new Date(desplandateS.split("-").reverse().join("-"));
        var desplandateE = new Date(desplandateE.split("-").reverse().join("-"));
        var envplandateS = new Date(envplandateS.split("-").reverse().join("-"));
        var envplandateE = new Date(envplandateE.split("-").reverse().join("-"));
        var devplandateS = new Date(devplandateS.split("-").reverse().join("-"));
        var devplandateE = new Date(devplandateE.split("-").reverse().join("-"));
        var tesplandateS = new Date(tesplandateS.split("-").reverse().join("-"));
        var tesplandateE = new Date(tesplandateE.split("-").reverse().join("-"));
        var golvplandateS = new Date(golvplandateS.split("-").reverse().join("-"));
        var golvplandateE = new Date(golvplandateE.split("-").reverse().join("-"));*/

        var plandiffdis = dateDiffInDays(new Date(displandateS), new Date(displandateE));
        var plandiffdes = dateDiffInDays(new Date(desplandateS), new Date(desplandateE));
        var plandiffenv = dateDiffInDays(new Date(envplandateS), new Date(envplandateE));
        var plandiffdev = dateDiffInDays(new Date(devplandateS), new Date(devplandateE));
        var plandifftes = dateDiffInDays(new Date(tesplandateS), new Date(tesplandateE));
        var plandiffgolv = dateDiffInDays(new Date(golvplandateS), new Date(golvplandateE));

        var svpwplandatediff = [plandiffdis,plandiffdes,plandiffenv,plandiffdev,plandifftes,plandiffgolv];
        return svpwplandatediff
      }

      const effort_difference_act = (ldmp_act, mp_act, ldimp_act, imp_act, pm_act) => {

        var effdevact = [ldmp_act, mp_act, ldimp_act, imp_act, pm_act];
        return effdevact;
      }

      const effort_difference_plan = (ldmp_plan, mp_plan, ldimp_plan, imp_plan, pm_plan) => {

        var effdevplan = [ldmp_plan, mp_plan, ldimp_plan, imp_plan, pm_plan];
        return effdevplan;
      }


      db.getDocumentPhaseWise(proj_name, proj_phase, function(err, doc, proj_phase) {
        console.log(doc);
        //ttr
        var ttrdatediff = new Array();
        //svpw
        var svpwactdatediff = new Array();
        var svpwplandatediff = new Array();
        //effdev
        var effdevplan = new Array();
        var effdevact = new Array();
        //const


        /*phase specific output*/

        if (proj_phase === 'Discovery Phase') {
          ttrdatediff = date_difference(doc.Dis_act_strdt,doc.Dis_act_enddt,doc.Dis_plan_strdt,doc.Dis_plan_enddt);


        }
        if (proj_phase === 'Design Phase') {
          ttrdatediff = date_difference(doc.Des_act_strdt,doc.Des_act_enddt,doc.Des_plan_strdt,doc.Des_plan_enddt);


        }
        if (proj_phase === 'Environment Readiness Phase') {
          ttrdatediff = date_difference(doc.env_act_strdt,doc.env_act_enddt,doc.env_plan_strdt,doc.env_plan_enddt);


        }
        if (proj_phase === 'Development Phase') {
          ttrdatediff = date_difference(doc.Dev_act_strdt,doc.Dev_act_enddt,doc.Dev_plan_strdt,doc.Dev_plan_enddt);


        }
        if (proj_phase === 'Testing Phase') {
          ttrdatediff = date_difference(doc.tes_act_strdt,doc.tes_act_enddt,doc.tes_plan_strdt,doc.tes_plan_enddt);


        }
        if (proj_phase === 'Go-Live') {
          ttrdatediff = date_difference(doc.golv_act_strdt,doc.golv_act_enddt,doc.golv_plan_strdt,doc.golv_plan_enddt);


        }


        svpwactdatediff = svpw_actdifference(doc.Dis_act_strdt, doc.Dis_act_enddt, doc.Des_act_strdt, doc.Des_act_enddt, doc.env_act_strdt, doc.env_act_enddt, doc.Dev_act_strdt, doc.Dev_act_enddt, doc.tes_act_strdt, doc.tes_act_enddt, doc.golv_act_strdt, doc.golv_act_enddt);
        svpwplandatediff = svpw_plandifference(doc.Dis_plan_strdt, doc.Dis_plan_enddt, doc.Des_plan_strdt, doc.Des_plan_enddt, doc.env_plan_strdt, doc.env_plan_enddt, doc.Dev_plan_strdt, doc.Dev_plan_enddt, doc.tes_plan_strdt, doc.tes_plan_enddt, doc.golv_plan_strdt, doc.golv_plan_enddt);

        effdevact = effort_difference_act(doc.ldmp_act,doc.mp_act,doc.ldimp_act,doc.imp_act,doc.pm_act);
        effdevplan = effort_difference_plan(doc.ldmp_plan,doc.mp_plan,doc.ldimp_plan,doc.imp_plan,doc.pm_plan);

        res.render('combined', {
          title : "Dashboard",
          ttr : ttrdatediff,
          svpwact : svpwactdatediff,
          svpwplan: svpwplandatediff,
          effdevac : effdevact,
          effdevpl : effdevplan

        }); //res.render closing

      }); // getDocumentPhaseWise closing
  });    //  router.post closing

  return router;
};
