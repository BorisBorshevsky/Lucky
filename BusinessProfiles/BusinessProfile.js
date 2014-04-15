var MongoClient = require('mongodb').MongoClient

module.exports.CreateBusinessProfile = function(info, callback){
    MongoClient.connect('mongodb://127.0.0.1:27017/Lucky', function(err, db) {
      console.log("Connected to db")
      if(err){
        callback(err)
        return;
      }
      var collection = db.collection('businesses');
      collection.find({"username":info.businessName}).toArray(function(err, results) {
        if (results.length > 0) {
          db.close();
          callback("The business alleady exists")
          return;
        }
        collection.insert({businessName:info.businessName}, function(err, docs){
          if (err) {
            callback(err)
          }
          callback()
          db.close();
        });
      });
    }) 
  }
  
  module.exports.GetBusinessProfile = function(businessName, callback) {
    MongoClient.connect('mongodb://127.0.0.1:27017/Lucky', function(err, db) {
      console.log("Connected to db")
      if(err){
        callback(err)
        return;
      }
      var collection = db.collection('businesses');
      collection.findOne({"businessName":businessName}, function(err, document) {
        if (!document) {
          db.close();
          callback("The business not found")
          return;
        }
        callback(null,document)
        db.close();
      });
    });
  }