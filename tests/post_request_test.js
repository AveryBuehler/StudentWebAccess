var request = require('request');

// Example method of a post request, we can use it for testing
request({
  url: 'http://localhost:80/login',
  method: 'POST',
  json: {username: 'test', password: 'test'}
}, function(error, response, body){
	if(error) {
		console.log(error);
	}
	console.log(body);
});