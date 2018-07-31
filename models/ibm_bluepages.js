var bluepages = require('bluepages');
var admin_group='BO';
var user_group='B2B';
var lead_group='SPOC';
var options = ['uid', 'name'];

exports.authenticateUser = function(username, password, cb) {
  process.nextTick(function(){
    console.log("GETTING IBM INTRANET DETAILS");
    bluepages.authenticate(username, password, function(err, verified){
        if(err) {
          console.log("aunthentication error");
          cb(err, null);
        }
        if(verified) {
            // check for admin_group
            console.log("authentication success !");
            bluepages.authenticateGroup(username, admin_group, function(err, verified){
              if(err) {
                console.log("admin aunthentication error");
                cb(err, null);
              }
              else if(verified) {
                bluepages.getUserInfo({email: username}, options, function(err, result) {
                  if(err) {
                    console.log("unable to fetch user info by username");
                    cb(err, null);
                  }
                  else {
                    console.log("user info by username fetched");
                    console.log(result);
                    var record = { id: result.uid, name: result.name, group: "admin" };
                    cb(null, record);
                  }
                });
              }
              else {
                // check for lead_group
                bluepages.authenticateGroup(username, lead_group, function(err, verified){
                  if(err) {
                    console.log("lead authentication error");
                    cb(err, null);
                  }
                  else if(verified) {
                    bluepages.getUserInfo({email: username}, options, function(err, result) {
                      if(err) {
                        console.log("unable to fetch user info by username");
                        cb(err, null);
                      }
                      else {
                        console.log("user info by username fetched");
                        console.log(result);
                        var record = { id: result.uid, name: result.name, group: "program-manager" };
                        cb(null, record);
                      }
                    });
                  }
                  else {
                    // check for user group
                    bluepages.authenticateGroup(username, user_group, function(err, verified){
                      if(err) {
                        console.log("user authentication error");
                        cb(err, null);
                      }
                      else if(verified) {
                        bluepages.getUserInfo({email: username}, options, function(err, result) {
                          if(err) {
                            console.log("unable to fetch user info by username");
                            cb(err, null);
                          }
                          else {
                            console.log("user info by username fetched");
                            console.log(result);
                            var record = { id: result.uid, name: result.name, group: "service-manager" };
                            cb(null, record);
                          }
                        });
                      }
                      else {
                        console.log("belongs to no group");
                        cb(null, null);
                      }
                    });
                  }
                });
              }
            });
        }
        else {
          console.log("invalid credentials");
          cb(null, null);
        }
    });
  });
}

exports.authenticateID = function(userid, usergrp, cb) {
  process.nextTick(function(){
    console.log("deserializing user");
    bluepages.getUserInfo({uid: userid}, options, function(err, result) {
        if(err) {
          console.log("unable to fetch user details by id");
          cb(err, null);
        }
        else {
          console.log("user info by id fetched");
          console.log(result);
          var record = { id: result.uid, name: result.name, group: usergrp };
          cb(null, record);
        }
      });
  });
}
