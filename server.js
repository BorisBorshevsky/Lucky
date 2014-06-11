var Hapi = require('hapi');
var UserRepository = require('./users/userRepository.js');
var BusinessRepository = require('./businesses/businessRepository.js');

var usersEndpoint = require('./endpoints/users.js');

var srvaddr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var portnum = process.env.OPENSHIFT_NODEJS_PORT || 8080;



var server = Hapi.createServer(srvaddr, portnum);
var baseAddress = '/lucky';

server.views({
    engines: {
        jade: 'jade'
    },
    path: __dirname + '/templates'
});


server.route({
    method: 'GET',
    path: baseAddress,
    handler: function (request, reply) {
        
        var context = {
            title: 'Lucky Main Page',
            message: 'First try of mainpage'
        }
        reply.view('index',context)
    }
});

server.route({
    method: 'GET',
    path: baseAddress + '/userlist',
    handler: function (request, reply) {
        
        var context = {
            title: 'Lucky Main Page',
            message: 'First try of mainpage'
        }
        reply.view('index',context)
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
console.log("The server is running on " +  server.info.uri + " ...")
