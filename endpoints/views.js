module.exports.home = function (request, reply) {
    reply.view('home',{name: request.auth.credentials.name });
};