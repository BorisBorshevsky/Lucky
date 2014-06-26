module.exports.home = function (request, reply) {
   return reply.view('home',{username: request.auth.credentials.username });
};

module.exports.register = function (request, reply) {
    return reply.view('register');
}