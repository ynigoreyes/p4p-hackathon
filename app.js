// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://Omar:dash1234@ds247670.mlab.com:47670/bauthql", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
