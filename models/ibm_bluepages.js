var bluepages = require('bluepages');
var admin_group='BO';
var user_group='B2B';
var lead_group='SPOC';
var options = ['uid', 'name'];

function getUserByUsername(username, usergrp) {
  bluepages.getUserInfo({email: username}, options, function(err, result) {
    if(err) {
      console.log("unable to fetch user info by username");
      return null;
    }
    else {
      console.log("user info by username fetched");
      var record = { id: result.uid, name: result.name, group: usergrp };
      return record;
    }
  });
}

function getUserById(id, usergrp) {
  bluepages.getUserInfo({uid: id}, options, function(err, result) {
      if(err) {
        console.log("unable to fetch user details by id");
        return null;
      }
      else {
        console.log("user info by id fetched");
        var record = { id: result.uid, name: result.name, group: usergrp };
        return record;
      }
  });
}

exports.authenticateUser = function(username, password, cb) {
  process.nextTick(function() {
    console.log("GETTING IBM INTRANET DETAILS");
    bluepages.authenticate(username, password, function(err, verified){
        if(err) {
          console.log("aunthentication error");
          cb(err, null);
        }
        if(verified) {
            // check for admin_group
            bluepages.authenticateGroup(username, admin_group, function(err, verified){
              if(err) {
                console.log("admin aunthentication error");
                cb(err, null);
              }
              if(verified) {
                  var record = getUserByUsername(username, 'admin');
                  console.log(record);
                  cb(null, record);
              }
              else {
                // check for lead_group
                bluepages.authenticateGroup(username, lead_group, function(err, verified){
                  if(err) {
                    console.log("lead authentication error");
                    cb(err, null);
                  }
                  if(verified) {
                    var record = getUserByUsername(username, 'program-manager');
                    console.log(record);
                    cb(null, record);
                  }
                  else {
                    // check for user group
                    bluepages.authenticateGroup(username, user_group, function(err, verified){
                      if(err) {
                        console.log("user authentication error");
                        cb(err, null);
                      }
                      if(verified) {
                        var record = getUserByUsername(username, 'service-manager');
                        console.log(record);
                        cb(null, record);
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

exports.authenticateID = function(id, usergrp, cb) {
  process.nextTick(function() {
    console.log("deserializing user");
    var record = getUserById(id, usergrp);
    return record;
  });
}
