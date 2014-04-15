var Hapi = require('hapi');
var UserProfile = require('./UserProfiles/UserProfile.js');
var BusinessProfile = require('./BusinessProfiles/BusinessProfile.js');

var server = Hapi.createServer('localhost', 8000);
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
        UserProfile.CreateUserProfile(request.payload, function(err){
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
        UserProfile.GetUserProfile(request.params.username, function(err, result){
            if (err) {
                reply(err).code(404);
            }else{
                reply(result);
            }
        });
    }
});

server.route({
    method: 'POST',
    path: baseAddress + '/business',
    handler: function (request, reply) {
        BusinessProfile.CreateBusinessProfile(request.payload, function(err){
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
        BusinessProfile.GetBusinessProfile(request.params.businessName, function(err, result){
            if (err) {
                reply(err).code(404);
            }else{
                reply(result);
            }
        });
    }
});

server.start();
console.log("The server is running...")