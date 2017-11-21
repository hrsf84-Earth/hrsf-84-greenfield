const axios = require('axios');
try {
  //try to find config file, if doesn't exist then assume that
  //server is live and will retrieve variables from enviromental variables on server
  var api = require('../config.js');
} catch (err) {
} finally {
  var unsplash_applicationId = process.env.unsplash_applicationId || api.unsplash_applicationId;
  var unsplash_secret = process.env.unsplash_secret || api.unsplash_secret;

  //From jeff - what is the unsplash_secret used for??
}


const getPhotos = (input, callback) => {
  //PARAMETERS FOR UNSPLASH API
// query:	Search terms.
// page:	Page number to retrieve. (Optional; default: 1)
// per_page:	Number of items per page. (Optional; default: 10)
// collections:	Collection ID(‘s) to narrow search. If multiple, comma-separated.
  axios.get('https://api.unsplash.com/search/photos', {
    params: {query: input, per_page: "30"}, headers: {'Authorization': 'Client-ID 9c7f8bd9c717a9fb38a8cf1c8f5bfa39372aa246790420c14659c31c4d1261fe'}
  })
  .then(photosFromAPI => {
    console.log('THE LENGTH BRUH', photosFromAPI.data.results.length)
    callback(null, photosFromAPI.data.results);

  })
  .catch(apiError => {
    callback(apiError, null);
  });
}


module.exports.getPhotos = getPhotos;
