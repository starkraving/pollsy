var PollAdmin  = require('../models/polladmin');
var Poll       = require('../models/poll');
var express    = require('express');
var router     = express.Router();
var auth       = require('../auth');
var crypto     = require('crypto');

var auth_admin = auth('admin');

/**
 *administrative list of polls
 */
router.get('/polls', auth_admin, function(req, res){
	res.render("admin_polls", {title: "polls"});
});

/**
 *administrative form to edit a poll
 */
router.get('/polls/edit/:id', auth_admin, function(req, res){
	res.render("admin_polls_edit_id", {title: "polls edit :id"});
});

/**
 *update a poll
 */
router.post('/polls/edit/:id', auth_admin, function(req, res){
	
	res.redirect("/admin/polls");
});

/**
 *turn on or off public access to poll
 */
router.get('/polls/toggle/:id', auth_admin, function(req, res){
	
	res.redirect("/admin/polls");
});

/**
 *administrative form to create a poll
 */
router.get('/polls/new', auth_admin, function(req, res){
	res.render("admin_polls_new", {title: "polls new"});
});

/**
 *insert a new poll
 */
router.post('/polls/new', auth_admin, function(req, res){
	
	res.redirect("/admin/polls");
});

/**
 *admin homepage
 */
router.get('', auth_admin, function(req, res){
	Poll.find().exec(function(err, results){
		if ( results.length === 0 ) {
			res.render("admin_empty", {title: "Admin Homepage"});
		} else {
			res.render("admin", {title: "Admin Homepage", pollCount: results.length});
		}
	});
});

/**
 *admin login
 */
router.get('/login', function(req, res){
	PollAdmin.find().exec(function(err, accounts){
		if ( accounts.length > 0 ) {
			res.render("admin_login", {title: "Admin Login"});
		} else {
			res.render("admin_startup", {title: "Admin Startup"});
		}
	})
});

/**
 *process login
 */
router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	PollAdmin.findOne({'username': username}, function(err, result){
		var loggedIn = false;
		if ( result ) {
			var hash = crypto.createHmac('sha512', result.pwsalt);
			hash.update(password);
			hashedPassword = hash.digest('hex');
			if ( hashedPassword == result.pwhash ) {
				loggedIn = true;
				req.session.username = username;
				req.session.userRole = 'admin';
				res.redirect("/admin");
				return;
			}
		}
		if ( !loggedIn ) {
			res.render('admin_login',{title:'Admin Login', 
				loginErr:'<div class="alert alert-danger">Incorrect username/password</div>'});
		}
	});
});

/**
 *admin log out
 */
router.get('/logout', function(req, res){
	req.session.destroy();
	res.redirect("/");
});

/**
 *insert new admin
 */
router.post('/create', function(req, res){
	PollAdmin.find().exec(function(err, accounts){
		if ( accounts.length === 0 ) {
			var username = req.body.username;
			var password = req.body.password;
			var confirm = req.body.confirm;
			var salt = new Date().getTime().toString(36);
			if ( username.length > 0 && password.length > 0 && confirm.length > 0 && password == confirm ) {
				var hash = crypto.createHmac('sha512', salt);
				hash.update(password);
				hashedPassword = hash.digest('hex');
				var user = new PollAdmin({
					username:  username,
					pwhash:    hashedPassword,
					pwsalt:    salt
				}).save();
			}
		}
	});
	res.redirect("/admin");
});

module.exports = router;