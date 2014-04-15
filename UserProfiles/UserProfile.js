var MongoClient = require('mongodb').MongoClient

module.exports.CreateUserProfile = function(info, callback){
    MongoClient.connect('mongodb://127.0.0.1:27017/Lucky', function(err, db) {
      console.log("Connected to db")
      if(err){
        callback(err)
        return;
      }
      
  
      var collection = db.collection('users');
      collection.find({"username":info.username}).toArray(function(err, results) {
        if (results.length > 0) {
          db.close();
          callback("The user alleady exists")
          return;
        }
        collection.insert({username:info.username}, function(err, docs){
          if (err) {
            callback(err)
          }
          callback()
          db.close();
        });
      });
    }) 
  }

  module.exports.GetUserProfile = function(username, callback) {
    MongoClient.connect('mongodb://127.0.0.1:27017/Lucky', function(err, db) {
      console.log("Connected to db")
      if(err){
        callback(err)
        return;
      }
      var collection = db.collection('users');
      collection.findOne({"username":username}, function(err, document) {
        if (!document) {
          db.close();
          callback("The user not found")
          return;
        }
        callback(null,document)
        db.close();
      });
    });
  }