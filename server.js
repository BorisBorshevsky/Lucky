var Hapi = require('hapi');
var Nconf = require('nconf');


var UserRepository = require('./repositories/users.js');
var BusinessRepository = require('./repositories/businesses.js');

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



UserRepository.GetUsersList(function(err, res){
    console.log("users - local: " + JSON.stringify(users));
    console.log('users - database: ' + JSON.stringify(res));
    //users = res

})



var home = function (request, reply) {

    reply.view('home',{name: request.auth.credentials.name });
};

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply().redirect('/');
    }

    var message = '';
    var account = null;


    if (request.method === 'post') {

        if (!request.payload.username ||!request.payload.password) {
            message = 'Missing username or password';
        }
        else {
            //UserRepository.GetUsersList(function(err,res){
                //console.log("inside post: " + JSON.stringify(res))
              //  users = res
                account = users[request.payload.username];
            
                if (!account || account.password !== request.payload.password) {
                    message = 'Invalid username or password';
                }
            //})
        }

    }

    if (request.method === 'get' || message) {

        return reply.view('login2',{message: message });
    }

    request.auth.session.set(account);
    return reply().redirect('/');
};

var logout = function (request, reply) {

    request.auth.session.clear();
    return reply().redirect('/');
};


var srvaddr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var srvport = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server = new Hapi.Server(srvaddr, srvport);

var baseAddress = '/lucky';

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
            handler: home, 
            auth: true } 
        })

    server.route({ 
        method: ['GET', 'POST'], 
        path: '/login', 
        config: { 
            handler: login, 
            auth: { 
                mode: 'try' 
            } 
        } 
    })

    server.route({ 
        method: 'GET', 
        path: '/logout', 
        config: { 
            handler: logout, 
            auth: true 
        } 
    })

    server.route({
        method: 'POST',
        path: baseAddress + '/auth',
        handler: authEndpoint.authorize
        });

    server.route({
        method: 'GET',
        path: baseAddress,
        handler: viewsEndpoint.getLogin
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