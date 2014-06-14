var RestFinder = require('../algorithms/restFinder.js');
var UsersRepository = require('../repositories/users.js');

module.exports.getRecomendedRests = function (request, reply) {
    UsersRepository.GetUserProfile(request.params.username, function(err, document){
        if (err) {
            console.log("err: " + err);
            reply(err).code(404);
            return;
        }
        
        RestFinder.getRecomendedRests(document, function(err, result){
            if (err) 
                reply(err).code(404);
            else
                reply(result);
        });
    });
}

module.exports.createUser = function (request, reply) {
    UsersRepository.CreateUserProfile(request.payload, function(err){
        if (err) 
            reply(err).code(409);
        else
            reply();
    });   
}

module.exports.getUser = function (request, reply) {
    UsersRepository.GetUserProfile(request.params.username, function(err, result){
        if (err) 
            reply(err).code(404);
        else
            reply(result);
    });
}


module.exports.getUsers = function (request, reply) {
    UsersRepository.GetUsers(function(err,doc){
        if (err){
            reply(err).code(404);
        }else{
            reply(doc)
        }
   })  
}