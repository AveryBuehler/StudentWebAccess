let express = require('express');
let router = express.Router();
let passport = require('passport');

/*router.use(function timeLog (req, res, next) { // Example of middleware functions
  console.log('Time: ', Date.now())
  next()
})*/

router.route('/') // TODO: Likely use passport.js for redirects, this may not be needed
	.post(passport.authenticate('local', {	successRedirect: '../students/',
											failureRedirect: '/' })
);

module.exports = router;