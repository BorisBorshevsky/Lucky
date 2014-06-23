var Hapi = require('hapi');
var Nconf = require('nconf');

var MongoHelper = require('./repositories/mongoHelper.js')
var usersEndpoint = require('./endpoints/users.js');
var businessesEndpoint = require('./endpoints/businesses.js');
var viewsEndpoint = require('./endpoints/views.js');
var authEndpoint = require('./endpoints/auth.js');

var users = {
    boris: {
        id: 'boris',
        password: '123',
        name: 'HAGHDFGASD'
    },
    rami: {
        id: 'rami',
        password: '123',
        name: 'rami moshe'
    }
};





var srvaddr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var srvport = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server = new Hapi.Server(srvaddr, srvport);

var baseAddress = '/api';

server.pack.require('hapi-auth-cookie', function (err) {

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
    });

    server.views({
        engines: {
            html: 'handlebars'
        },
        path: __dirname + '/views'
    });

    server.route({ 
        method: 'GET', 
        path: '/', 
        config: { 
            handler: viewsEndpoint.home, 
            auth: true 
        } 
    })

    server.route({ 
        method: 'GET', 
        path: '/login', 
        config: { 
            handler: authEndpoint.getLoginPage, 
            auth: { 
                mode: 'try' 
            } 
        } 
    })

    server.route({ 
        method: 'POST', 
        path: '/login', 
        config: { 
            handler: authEndpoint.login, 
            auth: { 
                mode: 'try' 
            } 
        } 
    })

    server.route({ 
        method: 'GET', 
        path: '/logout', 
        config: { 
            handler: authEndpoint.logout, 
            auth: true 
        } 
    })

    server.route({
        method: 'GET',
        path: '/register',
        handler: viewsEndpoint.register
    });

    server.route({
        method: 'POST',
        path: '/register',
        handler: authEndpoint.registerNewUser
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
});