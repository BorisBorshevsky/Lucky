module.exports.home = function (request, reply) {
	console.log(request.auth.credentials.username);
    reply.view('home',{username: request.auth.credentials.username });
};

module.exports.register = function (request, reply) {
    return reply.view('register');
}