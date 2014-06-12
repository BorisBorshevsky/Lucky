var UsersRepository = require('../repositories/users.js');

module.exports.authorize = function (request, reply) {
    UsersRepository.GetUserProfile(request.payload.username, function(err, result){
    	console.log(request.payload.password + " : " + request.payload.username + " / " + JSON.stringify(result))
        if (err) 
            reply(err).code(401);
        else
            if (result.password == request.payload.password)
                 reply(null,true);
             else
             	reply("not found").code(401);
    });
}


