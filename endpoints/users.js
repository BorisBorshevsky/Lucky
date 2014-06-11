var RestFinder = require('../algorithms/restFinder.js');
var usersRepository = require('../repositories/users.js')

module.exports.getRecomendedRests = function (request, reply) {
    usersRepository.GetUserProfile(request.params.username, function(err, document){
        if (err) {
            console.log("err: " + err);
            reply(err).code(404);
            return;
        }
        
        RestFinder.getRecomendedRests(document, function(err, result){
            if (err) {
                reply(err).code(404);
            }else{
                reply(result);
            }
        })
        
    })
    
}