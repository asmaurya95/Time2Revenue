var nano = require('nano')('http://localhost:5984');
var db = nano.use('projects');
var doc = nano.db.use('projects');

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

exports.getDocument = function(proj_name, callback) {
  process.nextTick(function() {
    doc.view('findproject', 'findbyname',{ 'key': proj_name }, function(err, body) {
      var record;
        if(err) console.log("Error Occurred !");
        else {
          body.rows.forEach(function(doc){
            record = doc;
          });
        }
        //console.log(record.value);
        if(record)
          return callback(null, record.value)
    });
})
}

exports.getNames = function(callback) {
  process.nextTick(function() {
    doc.view('findproject', 'findbyname', function(err, body) {
      var record = new Array();
        if(err) console.log("Error Occurred !");
        else {
          body.rows.forEach(function(doc){
            record.push(doc.value.proj_name);
          });
        }
        //console.log(record.value);
        if(record) {
          return callback(null, record);
        }
        return callback(null, null);
    });
})
}

/**********************************/
 exports.getDocumentPhaseWise = function(proj_name, proj_phase, callback) {
   process.nextTick(function() {
     doc.view('findproject','findbyname',function(err,body) {
       var record;
         if (err) console.log("Error Occurred !");
         else {
           body.rows.forEach(function(doc){
             if (proj_name === doc.value.proj_name) {
               record = doc;
             }
           });
         }
         if (record) {
           return callback(null, record.value, proj_phase);
         }
     });
   })
}
