const express = require('express');
let router = express.Router();
const passport = require('passport');

router.route('/') // TODO: Likely use passport.js for redirects, this may not be needed
	.get(function(req, res){
		res.redirect('/');
	})
	.post(passport.authenticate('local', {	successRedirect: '/students/',
											failureRedirect: '/login'})
);

module.exports = router;