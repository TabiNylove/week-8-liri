// VARIABLES

var query = require("inquirer"); // node inquirer
var spotify = require('node-spotify-api'); // spotify extension compatible with node
var spotifyApi = new spotify({
    id: '8d121c94cc97460f8c2791ad649d0880',
    secret: '4a1ffaebe59c42e3abcb45476079e0e1'
}); // goes with above
var twitter = require("twitter");
var omdb = require("request");
var keyword; // initial user input that will be searched
var parameters; // type of response requested
//==========================================================
// create a prompt for the user to input information
query
    .prompt([{
        type: 'list',
        message: 'What would you like to access?',
        choices: ['Twitter', 'Spotify', 'Movies'],
        name: 'parameter'
    }, {
        type: 'confirm',
        message: 'Is this correct? Y/N',
        name: 'confirm',
        default: true
    }])
    .then(function(queryResponse) {
        // define the variables from the response
        parameter = queryResponse.parameter;

        // put in a message to let user know it is searching
        console.log("Processing...");

        // if the user has confirmed, check what parameters they want and run corresponding functions
        if (queryResponse.confirm) {
            switch (parameter) {
                case "Twitter":
                    tweets();
                    break;

                case "Spotify":
                    music();
                    break;

                case "Movies":
                    movies();
                    break;
            }
        }
    })
    //==========================================================
    // FUNCTIONS

// twitter function
var tweets = function() {

}

// spotify function
var music = function() {
    query
        .prompt([{
            type: 'input',
            message: 'Please enter a track name: ',
            name: 'trackQuery'
        }])
        .then(function(spotifyResponse) {
            // search spotify
            spotifyApi.search({
                type: 'track',
                query: spotifyResponse.trackQuery,
                limit: 8
            }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // for each object, record data name in console
                for (var i = 0; i < 8; i++) {
                    console.log(data.tracks.items[i].name);
                }
            });
        })
}

// omdb function
var movies = function() {

}