var nano = require('nano')('http://localhost:5984');
var db = nano.use('ibm');
var ibm = nano.db.use('ibm');

exports.findById = function(id, cb) {
  process.nextTick(function() {
    db.get(id, function(err, body){
      if (body) {
        console.log("deserializing...");
        console.log(body);
        cb(null, body);
      }
      else {
        cb(new Error('User ' + id + ' does not exist'), null);
      }
    })
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    ibm.view('users', 'login',{ 'key': username }, function(err, body) {
      var record;
        if(err) console.log("Error Occurred !");
        else {
          body.rows.forEach(function(doc){
            //console.log(doc);
            record = doc;
          });
        }
        console.log("record is....");
        console.log(record);
        if(record)
          return cb(null, record);
        console.log('username not found in db');
        return cb(null, null);
    });
})
}
