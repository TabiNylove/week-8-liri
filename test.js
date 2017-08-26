var spotify = require('spotify-web-api-node'); // spotify extension compatible with node
var spotifyApi = new spotify({
  clientId : '8d121c94cc97460f8c2791ad649d0880',
  clientSecret : '4a1ffaebe59c42e3abcb45476079e0e1'
});

// call the function
spotifyApi.searchTracks('artist:adele')
  .then(function(data) {
    console.log('Tracks by adele: ', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
});