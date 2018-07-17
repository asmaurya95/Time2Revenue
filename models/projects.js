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

exports.updateDocument = function(doc, id, callback) {
  process.nextTick(function() {
    db.get(id, function(error, existing) {
      if(!error) doc._rev = existing._rev;
      db.insert(doc, id, callback);
      console.log(doc);
    })
  });
}
