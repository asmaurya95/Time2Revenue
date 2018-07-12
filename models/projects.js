var nano = require('nano')('http://localhost:5984');
var db = nano.use('projects');

exports.insertDocument = function(doc) {
  process.nextTick(function() {
    db.insert(doc, function(err, body) {
      if (!err)
        console.log(body);
      }
    );
  });
}
