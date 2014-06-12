module.exports.getLogin = function (request, reply) {       
    var context = {
        title: 'Lcuky - Login',
        message: 'Hello - Please Login To Your Account',
        status: 'loged in or not'
    }
    reply.view('login',context)
}