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
		req.user.date_of_birth = dateMMDDYYYY(req.user.date_of_birth);
		console.log(dateMMDDYYYY(req.user.date_of_birth));
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

function dateMMDDYYYY(d) {
	if(typeof d === "string") 
		d = new Date(d);
	return d.getFullYear() + "-" + padAA(d.getMonth().toString(), 2, "0") + "-" + padAA(d.getDay().toString(), 2, "0");
}

function padAA(s, n, c) {
	if(s.length < n) {
		return c.repeat(n - s.length) + s;
	} else {
		return s;
	}
}