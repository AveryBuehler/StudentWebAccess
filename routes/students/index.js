// Student view

let express = require('express');
let router = express.Router();

let knex = require('../../dbconnection.js').connection(process.argv);

router.route('/')
	.get(function(req, res) {
		res.render('index', {});
	});

router.route('/personal')
	.get(function(req, res) {
		res.render('personal', req.user);
	});

router.route('/academic')
	.get(function(req, res) {
		res.render('academic', req.user);
	});

router.route('/classes')
	.get(function(req, res) {
		knex.select().table('classes.classes').then(function(data) {
			res.render('classes', {classes: data});
		});
		
	});

module.exports = router;