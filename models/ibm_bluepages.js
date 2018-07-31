var bluepages = require('bluepages');
var admin_group='BO';
var user_group='B2B';
var lead_group='SPOC';
var options = ['uid', 'name'];

exports.authenticateUser = function(username, password, cb) {
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
                    return null;
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
                        return null;
                      }
                      else {
                        console.log("user info by username fetched");
                        console.log(result);
                        var record = { id: result.uid, name: result.name, group: "program-manager" };
                        return record;
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
                            return null;
                          }
                          else {
                            console.log("user info by username fetched");
                            console.log(result);
                            var record = { id: result.uid, name: result.name, group: "service-manager" };
                            return record;
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
}

exports.authenticateID = function(id, usergrp, cb) {
    console.log("deserializing user");
    bluepages.getUserInfo({uid: id}, options, function(err, result) {
        if(err) {
          console.log("unable to fetch user details by id");
          return null;
        }
        else {
          console.log("user info by id fetched");
          console.log(result);
          var record = { id: result.uid, name: result.name, group: usergrp };
          return record;
        }
      });
}
