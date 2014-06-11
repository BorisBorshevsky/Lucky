
http = require("http")

var makeHttpPostRequest = function (host, port, path, data, callback) {

    var options = {
    host: host,
    port: port,
    path: path,
    method: 'POST'
  };

  var req = http.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    if (res.statusCode == 200)
      callback(res.statusCode)
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback(res.statusCode,chunk)
    //  console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });


  req.write( JSON.stringify (data) )
  req.end();
}


/*
var newUser ={
  username: "boris5",
  password: "123123",
  kosher: true,
  styles: ["aaa","bbb","ccc"]
}

makeHttpPostRequest('localhost',8080,'/lucky/users',newUser,function(code,message){
  if(code == 200)
    console.log("post success")
  else
    console.log("Error: " + message) 
})

*/





var makeHttpGetRequest = function (host, port, path, callback) {
  
  var options = {
    host: host,
    port: port,
    path: path
  };

  http.get(options, function(res) {
    //console.log("Got response: " + res.statusCode);
    res.on("data", function(chunk) {
      //console.log("BODY: " + chunk);
      callback(res.statusCode,chunk)  
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    callback(e.message)
  });

};

module.exports.makeHttpGetRequest = makeHttpGetRequest
module.exports.makeHttpPostRequest = makeHttpPostRequest

/*
makeHttpGetRequest('localhost',8080,'/lucky/users/test3',function(code,res){
  if (code != 200){
    console.log("ErrorCode: " + code + ", Massege: " + res)
  }else{
    console.log("ErrorCode: " + code + ", Massege: " + res)  
  }
});

*/