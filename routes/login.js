let express = require('express');
let router = express.Router();

/*router.use(function timeLog (req, res, next) { // Example of middleware functions
  console.log('Time: ', Date.now())
  next()
})*/

router.route('/') // TODO: Likely use passport.js for redirects, this may not be needed
	.get(function(req, res) {
		res.send('TODO: Get login page')
	})
	.post(function(req, res) {
		res.send('TODO: Process login');
	});

module.exports = router;