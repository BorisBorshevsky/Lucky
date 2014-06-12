var MongoClient = require('mongodb').MongoClient
var MongoHelper = require('./mongoHelper.js')

var mongoConncetionString = MongoHelper.GetConnectionString();

//-u admin -p vcFx1_6Y5_rT --host $OPENSHIFT_MONGODB_DB_HOST --port $OPENSHIFT_MONGODB_DB_PORT lucky

module.exports.CreateUserProfile = function(info, callback){
    MongoClient.connect(mongoConncetionString, function(err, db) {
      console.log("Connected to db")
      if(err){
        callback(err)
        return;
      }

      var collection = db.collection('users');
      collection.findOne({"username":info.username},function(err, results) {
        if (results) {
            db.close();
            callback("The user alleady exists")
            return;
        }
        collection.insert({username:info.username, kosher:info.kosher, styles:info.styles}, function(err, docs){
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
    MongoClient.connect(mongoConncetionString, function(err, db) {
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

module.exports.GetUsersList = function(callback) {
    MongoClient.connect(mongoConncetionString, function(err, db) {
        console.log("Connected to db")
        if(err){
          callback(err)
          return;
        }
        var collection = db.collection('users');

        collection.find({},{_id:0}).toArray(function(err, document) {
          //console.log("check: " + err + document);
          if (!document) {
            db.close();
            callback("no users found")
            return;
          }
          callback(null,document)
          db.close();
        });

    });
}




