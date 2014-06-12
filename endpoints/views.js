module.exports.getIndex = function (request, reply) {       
    var context = {
        title: 'Lucky Main Page',
        message: 'First try of mainpage'
    }
    reply.view('index',context)
}