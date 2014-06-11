var BusinessRepository = require('../repositories/businesses.js');

module.exports.createBusiness = function (request, reply) {
    BusinessRepository.CreateBusinessProfile(request.payload, function(err){
        if (err) 
            reply(err).code(409);
        else
            reply();
    });
}

module.exports.getBusiness = function (request, reply) {
    BusinessRepository.GetBusinessProfile(request.params.businessName, function(err, result){
        if (err) 
            reply(err).code(404);
        else
            reply(result);
    });
}