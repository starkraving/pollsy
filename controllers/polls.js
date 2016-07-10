var express = require('express');
var router = express.Router();


/**
 *public list of polls
 */
router.get('', function(req, res){
	res.render("polls", {title: ""});
});

/**
 *public display of poll results
 */
router.get('/results/:id', function(req, res){
	res.render("polls_results_id", {title: " results :id"});
});

/**
 *public form to vote on a poll
 */
router.get('/vote/:id', function(req, res){
	res.render("polls_vote_id", {title: " vote :id"});
});

/**
 *update the votes in a poll
 */
router.post('/vote/:id', function(req, res){
	
	res.redirect("/polls/results/:id");
});

module.exports = router;