var nano = require('nano')('http://localhost:5984');
var ibm = nano.db.use('ibm');

exports.findById = function(id, cb) {
  process.nextTick(function() {
    ibm.view('users', 'login',{ 'id': id }, function(err, body) {
      var record;
      body.rows.forEach( function(doc) {
        record = doc;
      });
      if (record) {
        cb(null, record);
      }
      else {
        cb(new Error('User ' + id + ' does not exist'))
      }
    });
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    ibm.view('users', 'login',{ 'key': username }, function(err, body) {
      var record;
        if(err) console.log("Error Occurred !");
        else {
          body.rows.forEach(function(doc){
            console.log(doc);
            record = doc;
          });
        }
        if(record)
          return cb(null, record);
        console.log('username not found in db');
        return cb(null, null);
    });
})
}
