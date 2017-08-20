// VARIABLES

var query = require("inquirer"); // node inquirer
var spotify = require('spotify-web-api-node'); // spotify extension compatible with node
var spotifyApi = new spotify({
  clientId : '8d121c94cc97460f8c2791ad649d0880',
  clientSecret : '4a1ffaebe59c42e3abcb45476079e0e1'
}); // goes with above
var keyword; // initial user input that will be searched
var parameters; // type of response requested
//==========================================================
// create a prompt for the user to input information
query
	.prompt([
		{
			type: 'list',
			message: 'Which would you like to search?',
			choices: ['Album', 'Artist', 'Track'],
			name: 'parameters'
		},
		{
			type: 'input',
			message: 'What is the name of the album/artist/track? ',
			name: 'keyword'
		},
		{
			type: 'confirm',
			message: 'Is this correct? Y/N',
			name: 'confirm',
			default: true
		}
	])
	.then(function(queryResponse) {
		// define the variables from the response
		keyword = queryResponse.keyword;
		parameters = queryResponse.parameters;

		// put in a message to let user know it is searching
		console.log("Searching for " + keyword + "...");

		// if the user has confirmed, check what parameters they want and run corresponding functions
		if (queryResponse.confirm) {
			switch (parameters) {
			  case "Album":
			    album();
			    break;

			  case "Artist":
			    artist();
			    break;

			  case "Track":
			    track();
			    break;
			}
		}
	})
//==========================================================
// FUNCTIONS

function album() {
	// Get tracks in an album
	spotifyApi.getAlbumTracks(keyword, { limit : 5, offset : 1 })
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

function artist() {
	// Search tracks whose artist's name contains keyword
	spotifyApi.searchTracks('artist:' + keyword)
  .then(function(data) {
    console.log('Tracks by "' + keyword + '": ', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

function track() {
	// Search tracks whose name, album or artist contains keyword
	spotifyApi.searchTracks(keyword)
  .then(function(data) {
    console.log('Songs with "' + keyword + '": ', data.body);
  }, function(err) {
    console.error(err);
  });
}
