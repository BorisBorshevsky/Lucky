var Hapi = require('hapi');
var UserRepository = require('./repositories/users.js');
var BusinessRepository = require('./repositories/businesses.js');
var Nconf = require('nconf');
var MongoHelper = require('./repositories/mongoHelper.js')

var usersEndpoint = require('./endpoints/users.js');

var server = Hapi.createServer(process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', process.env.OPENSHIFT_NODEJS_PORT || 8080);
var baseAddress = '/lucky';


server.route({
    method: 'GET',
    path: baseAddress,
    handler: function (request, reply) {
        reply('Lucky');
    }
});

server.route({
    method: 'POST',
    path: baseAddress + '/users',
    handler: function (request, reply) {
        UserRepository.CreateUserProfile(request.payload, function(err){
            if (err) {
                reply(err).code(409);
            }else{
                reply();
            }
        });
    }
});

server.route({
    method: 'GET',
    path: baseAddress + '/users/{username}',
    handler: function (request, reply) {
        UserRepository.GetUserProfile(request.params.username, function(err, result){
            if (err) {
                reply(err).code(404);
            }else{
                reply(result);
            }
        });
    }
});

server.route({
    method: 'GET',
    path: baseAddress + '/users/{username}/getRecomendedRests',
    handler: usersEndpoint.getRecomendedRests
});

server.route({
    method: 'POST',
    path: baseAddress + '/business',
    handler: function (request, reply) {
        BusinessRepository.CreateBusinessProfile(request.payload, function(err){
            if (err) {
                reply(err).code(409);
            }else{
                reply();
            }
        });
    }
});

server.route({
    method: 'GET',
    path: baseAddress + '/business/{businessName}',
    handler: function (request, reply) {
        BusinessRepository.GetBusinessProfile(request.params.businessName, function(err, result){
            if (err) {
                reply(err).code(404);
            }else{
                reply(result);
            }
        });
    }
});

server.start();
console.log("The server is running... " + server.info.uri  + " , " + MongoHelper.GetConnectionString())
