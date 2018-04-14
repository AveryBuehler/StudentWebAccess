// Student view

const express = require('express');
let router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.render('error', {error: 'GET not implemented'});
	})
	.post(function(req, res) {
		res.send('error', {error: 'POST not implemented'});
	});

module.exports = router;