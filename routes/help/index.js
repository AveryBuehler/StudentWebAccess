// Help view?

let express = require('express');
let router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.render('help', {});
	});

module.exports = router;