// Admin view

let express = require('express');
let router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.send('TODO: [Folder name] route');
	});

module.exports = router;