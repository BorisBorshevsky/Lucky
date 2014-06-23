module.exports.home = function (request, reply) {
    reply.view('home',{name: request.auth.credentials.name });
};

module.exports.register = function (request, reply) {
    return reply.view('register');
}