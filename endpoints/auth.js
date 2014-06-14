var UsersRepository = require('../repositories/users.js');

module.exports.login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply().redirect('/');
    }

    var message = '';
    if (!request.payload.username ||!request.payload.password) {
        message = 'Missing username or password';
        return reply().redirect('/');
    }

    UsersRepository.GetUserProfile(request.payload.username, function(err,user){
        if (err || user.password !== request.payload.password) {
            message = 'Invalid username or password';
            return reply.view('login',{message: message });
        }
        request.auth.session.set(user);
        return reply().redirect('/');
    })

};


module.exports.getLoginPage = function(request, reply){
    if (request.auth.isAuthenticated)
        return reply().redirect('/');
    reply.view('login');
}

module.exports.logout = function (request, reply) {

    request.auth.session.clear();
    return reply().redirect('/');
};
