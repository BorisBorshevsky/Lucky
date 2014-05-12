getUserInfo = function(){
    var user = {
    kosher : true,
    styles : ['meat','gurme']
    }
    return user;    
}



getRests = function() {
    
 
    var rests = new Array;

    rests[0] = {
        name   : "John1",
        kosher : true,
        styles :  ['meat'],
        score  : 30
    };
    
    rests[1] = {
        name: "John2",
        kosher : true,
        styles       :  ['gurme'],
        score : 30
    };
    
    rests[2] = {
        name: "John3",
        kosher : true,
        styles       :  ['meat','aaa'],
        score : 36
    };
    
    rests[3] = {
        name: "John4",
        kosher : true,
        styles       :  ['me'],
        score : 20
    };
    
    rests[4] = {
        name: "John5",
        kosher : false,
        styles       :  ['meat','gurme'],
        score : 10
    };
    
    rests[5] = {
        name: "John6",
        kosher : false,
        styles       :  ['meat'],
        score : 60
    };
    
    rests[6] = {
        name: "John7",
        kosher : true,
        styles       :  ['gurme'],
        score : 40
    };
    
     
    return rests;
}

getStyleOfRest = function(rests, callback){
    for (var i = 0  ; i < rests.length ; i++) {
        for (var j = 0  ; j < rests[i].styles.length ; j++) {
            callback(rests[i].styles[j], rests[i])
        }
    }
}

getStyleOfuser = function(user, callback){
    for (var i = 0  ; i < user.styles.length ; i++) {
        callback(user.styles[i])
    }
}

getRestsWithScore = function(user,rests){
    
    for (key in rests) {
        if (user.kosher === true && rests[key].kosher === false) {
            rests[key].score = 0;                   
        }
    }
    
    getStyleOfRest(rests, function(restStyle, rest){
        getStyleOfuser(user, function(userStyle){
            
            if (restStyle === userStyle && rest.score != 0) {
                if (restStyle === 'meat') {
                    rest.score += 5
                }
                if (restStyle === 'gurme') {
                    rest.score += 17
                }
            }
        }) 
    });

    return rests
}




var getRecomendedRests = function(callback) {
    var rests = getRestsWithScore(getUserInfo(), getRests())
    
    rests.sort(function(a,b) {
        return b.score - a.score
    })
    
    callback(null, rests.slice(0,3));
}




module.exports.getRecomendedRests = getRecomendedRests




/*var rests = getRestsWithScore(getUserInfo(), getRests())
var result = algo(rests)

console.log(result)*/