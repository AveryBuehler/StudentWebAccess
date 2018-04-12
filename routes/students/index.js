// Student view

let express = require('express');
let router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.send('TODO: [Folder name] route');
	})
	.post(function(req, res) {
		res.send('TODO: Login success?')
	});

module.exports = router;