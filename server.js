var Hapi = require('hapi');
var UserRepository = require('./repositories/users.js');
var BusinessRepository = require('./repositories/businesses.js');
var Nconf = require('nconf');
var MongoHelper = require('./repositories/mongoHelper.js')
var usersEndpoint = require('./endpoints/users.js');
var businessesEndpoint = require('./endpoints/businesses.js');
var viewsEndpoint = require('./endpoints/views.js');
var authEndpoint = require('./endpoints/auth.js');


var srvaddr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var srvport = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var server = Hapi.createServer(srvaddr, srvport);
var baseAddress = '/lucky';

server.views({
    engines: {
        html: 'handlebars'
    },
    path: __dirname + '/views'
});

server.route({
    method: 'POST',
    path: baseAddress + '/auth',
    handler: authEndpoint.authorize
});

server.route({
    method: 'GET',
    path: baseAddress,
    handler: viewsEndpoint.getIndex
});

server.route({
    method: 'GET',
    path: baseAddress + '/userslist',
    handler: usersEndpoint.getUsers
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
