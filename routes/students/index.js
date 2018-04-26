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
		req.user.date_of_birth = req.user.date_of_birth;
		res.render('personal', req.user);
	});
	
//router.get('/personal/update',
//	function(req, res) {
//		console.log('Got the personal update page, hahahaha');
//		res.send("Updated info");
//	});
	
router.post('/personal/update', function(req, res) {
		knex('users.student')
		.where({student_id: req.user.student_id})
		.update({
			fname: req.body.firstname,
			minit: req.body.middleinit,
			lname: req.body.lastname,
			address: req.body.address,
			email: req.body.email,
			phone_number: req.body.phonenum,
			thisKeyIsSkipped: undefined
		}).finally( function () {
			//knex.destroy()
			res.redirect('/students/personal');
		})
	});
	
router.route('/academic')
	.get(function(req, res) {
		knex('classes.class_registration')
			.where({student_id: req.user.student_id})
			.join('classes.classes' ,{'classes.class_registration.crn': 'classes.classes.crn'})
			.join('classes.class_information', {'classes.class_registration.crn': 'classes.class_information.crn'})
			.then(function(data) {
				data.forEach( function(element, index) {
					if(element.class_meeting_days == 'TBA') {
						delete element.class_start_time;
						delete element.class_end_time;
					}
				});
				res.render('academic', {classes: data});
			});
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
	console.log(d);
	return d.getDay().toString() + "-" + d.getMonth().toString() + "-" + d.getFullYear();
}

function padAA(s, n, c) {
	if(s.length < n) {
		return c.repeat(n - s.length) + s;
	} else {
		return s;
	}
}