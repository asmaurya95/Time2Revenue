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

  /*GET Dashboard Page*/
  router.get('/dashboard',
    require('connect-ensure-login').ensureLoggedIn(),
    (req,res) => {
      db.getNames(function(err, doc){
        console.log(doc);
        res.render('dashboard', {projlist: doc});
      });
  });

  /*POST Dashboard Page*/
  router.post('/dashboard',
    require('connect-ensure-login').ensureLoggedIn(),
    (req,res) => {
      console.log(req.body);
      var proj_name = req.body.projname;
      var proj_phase = req.body.projphase;

      /*Business logic function*/
      const date_difference = (actdateS, actdateE, plandateS, plandateE) => {
        var actdateS = actdateS.getTime();
        var actdateE = actdateE.getTime();
        var plandateS = plandateS.getTime();
        var plandateE = plandateE.getTime();

        var actdiff = actdateE - actdateS;
        var plandiff = plandateE - plandateS;
        var datediff = [actdiff, plandiff];
        return datediff;
      }

      const svpw_actdifference = (disactdateS, disactdateE, desactdateS, desactdateE, envactdateS, envactdateE, devactdateS, devactdateE, tesactdateS, tesactdateE, golvactdateS, golvactdateE) => {
        var disactdateS = disactdateS.getTime();
        var disactdateE = disactdateE.getTime();
        var desactdateS = desactdateS.getTime();
        var desactdateE = desactdateE.getTime();
        var envactdateS = envactdateS.getTime();
        var envactdateE = envactdateE.getTime();
        var devactdateS = devactdateS.getTime();
        var devactdateE = devactdateE.getTime();
        var tesactdateS = tesactdateS.getTime();
        var tesactdateE = tesactdateE.getTime();
        var golvactdateS = golvactdateS.getTime();
        var golvactdateE = golvactdateE.getTime();

        var actdiffdis = disactdateE - disactdateS;
        var actdiffdes = desactdateE - desactdateS;
        var actdiffenv = envactdateE - envactdateS;
        var actdiffdev = devactdateE - devactdateS;
        var actdifftes = tesactdateE - tesactdateS;
        var actdiffgolv = golvactdateE - golvactdateS;

        var svpwactdatediff = [actdiffdis,actdiffdes,actdiffenv,actdiffdev,actdifftes,actdiffgolv];
        return svpwactdatediff
      }

      const svpw_plandifference = (displandateS, displandateE, desplandateS, desplandateE, envplandateS, envplandateE, devplandateS, devplandateE, tesplandateS, tesplandateE, golvplandateS, golvplandateE) => {
        var displandateS = displandateS.getTime();
        var displandateE = displandateE.getTime();
        var desplandateS = desplandateS.getTime();
        var desplandateE = desplandateE.getTime();
        var envplandateS = envplandateS.getTime();
        var envplandateE = envplandateE.getTime();
        var devplandateS = devplandateS.getTime();
        var devplandateE = devplandateE.getTime();
        var tesplandateS = tesplandateS.getTime();
        var tesplandateE = tesplandateE.getTime();
        var golvplandateS = golvplandateS.getTime();
        var golvplandateE = golvplandateE.getTime();

        var plandiffdis = displandateE - displandateS;
        var plandiffdes = desplandateE - desplandateS;
        var plandiffenv = envplandateE - envplandateS;
        var plandiffdev = devplandateE - devplandateS;
        var plandifftes = tesplandateE - tesplandateS;
        var plandiffgolv = golvplandateE - golvplandateS;

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
          ttrdatediff :{},
          svpwactdatediff :{},
          svpwplandatediff :{},
          effdevact :{},
          effdevplan :{}

        }); //res.render closing

      }); // getDocumentPhaseWise closing
  });    //  router.post closing








  return router;
};
