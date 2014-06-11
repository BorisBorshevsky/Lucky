var Nconf = require('nconf');

Nconf.argv()
    .env()
    .file({ file: __dirname + '../../config.json' });

module.exports.GetConnectionString = function(){
	var mongodbConfig = Nconf.get("mongodb");
	var mongodbHost = "";
	if (mongodbConfig.host.indexOf(".") > -1)
	  mongodbHost = mongodbConfig.host
	else
	  mongodbHost = process.env[mongodbConfig.host];

	var mongodbPort = "";
	if (typeof mongodbConfig.port === "number")
		mongodbPort = mongodbConfig.port;
	else
		mongodbPort = process.env[mongodbConfig.port];

	if (mongodbConfig.username)
		return 'mongodb://' + mongodbConfig.username + ':' + mongodbConfig.password + '@' + mongodbHost + ':' + mongodbPort  + '/' + mongodbConfig.dbName;
	else
		return 'mongodb://' + mongodbHost + ':' + mongodbPort  + '/' + mongodbConfig.dbName;
}