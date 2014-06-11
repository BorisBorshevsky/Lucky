var MongoClient = require('mongodb').MongoClient

if (process.env.os == 'Windows_NT') {
  var mongoConncetionString = 'mongodb://127.0.0.1:27017/lucky'
} else{
  var mongoConncetionString = 'mongodb://admin:vcFx1_6Y5_rT@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT  + '/lucky';  
};

//mongo -u admin -p vcFx1_6Y5_rT --host $OPENSHIFT_MONGODB_DB_HOST --port $OPENSHIFT_MONGODB_DB_PORT lucky


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
            callback("The user allready exists")
            return;
        }
        collection.insert({username:info.username, kosher:info.kosher, styles:info.styles, password:info.password}, function(err, docs){
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



