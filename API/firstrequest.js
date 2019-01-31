const request = require('request');

request('https://api.themoviedb.org/3/movie/550?api_key=c9e224f5beda67126239990190aba8a7', function(error, response, body) {
    if (error){
        console.log(error)
    } else {
        if(response.statusCode == 200) {
            //things worked
            console.log(body)
        }
    }
})