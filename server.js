var Hapi = require('hapi');
var UserRepository = require('./repositories/users.js');
var BusinessRepository = require('./repositories/businesses.js');
var Nconf = require('nconf');
var MongoHelper = require('./repositories/mongoHelper.js')
var usersEndpoint = require('./endpoints/users.js');
var businessesEndpoint = require('./endpoints/businesses.js');


var server = Hapi.createServer(process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', process.env.OPENSHIFT_NODEJS_PORT || 8080);
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
    path: baseAddress + '/userslist',
    handler: function (request, reply) {
        
        var context = {
            title: 'Users List',
            message: 'This is the list of users:'
        }
        
        UserRepository.GetUsersList(function(err,doc){
            if (err){
                reply(err).code(404);
            }else{
                reply(doc)
            }
        })
        
        //reply.view('userslist',context)
    }
});


server.route({
    method: 'POST',
    path: baseAddress + '/users',
    handler: usersEndpoint.createUser
});

server.route({
    method: 'GET',
    path: baseAddress + '/users/{username}',
    handler: usersEndpoint.getUser
});

server.route({
    method: 'GET',
    path: baseAddress + '/users/{username}/getRecomendedRests',
    handler: usersEndpoint.getRecomendedRests
});

server.route({
    method: 'POST',
    path: baseAddress + '/business',
    handler: businessesEndpoint.createBusiness
});

server.route({
    method: 'GET',
    path: baseAddress + '/business/{businessName}',
    handler: businessesEndpoint.getBusiness
});

server.start();

console.log("MongoDB connection : " + MongoHelper.GetConnectionString());
console.log("The server is running on " + server.info.uri  + " ...");
