const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'login';


const findLoginDoc = function(db) {
    // Get the documents collection
    const collection = db.collection('login');
    // Find some documents
    collection.find({ 'username' : 'bryant', 'password':'password'}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
    });
  }

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  //console.log(db);

  findLoginDoc(db);

  client.close();

  console.log("client closed");

});