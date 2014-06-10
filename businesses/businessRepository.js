var MongoClient = require('mongodb').MongoClient

if (process.env.os == 'Windows_NT') {
  var mongoConncetionString = 'mongodb://127.0.0.1:27017/lucky'
} else{
  var mongoConncetionString = 'mongodb://admin:vcFx1_6Y5_rT@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT  + '/lucky';  
};

module.exports.CreateBusinessProfile = function(info, callback){
    MongoClient.connect(mongoConncetionString, function(err, db) {
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
    MongoClient.connect(mongoConncetionString, function(err, db) {
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
