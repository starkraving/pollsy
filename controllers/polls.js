var express  = require('express');
var router   = express.Router();
var Poll     = require('../models/poll');


/**
 *public list of polls
 */
router.get('', function(req, res){
	Poll.find({active: true}).sort('-totalCount').exec(function(err, results){
		if ( results.length === 0 ) {
			res.redirect('/admin');
		} else {
			res.render("polls", {title: "Public Polls", polls: results});
		}
	});
});

/**
 *public display of poll results
 */
router.get('/results/:id', function(req, res){
	Poll.findOne({hash: req.params.id}).exec(function(err, result){
		res.render("polls_results_id", {title: "Poll Results: "+result.question, id: req.params.id, poll: result});
	});
});

/**
 *public form to vote on a poll
 */
router.get('/vote/:id', function(req, res){
	Poll.findOne({hash: req.params.id}).exec(function(err, result){
		res.render("polls_vote_id", {title: "Poll: "+result.question, id: req.params.id, poll: result});
	});
});

/**
 *update the votes in a poll
 */
router.post('/vote/:id', function(req, res){
	if ( req.body.answer ) {
		Poll.findOne({hash: req.params.id}).exec(function(err, result){
			var intAnswer = parseInt(req.body.answer, 10);
			if ( intAnswer < result.answers.length ) {
				result.answers[intAnswer].count++;
				result.totalCount++;
				result.save(function(err, doc, rowsaffected){
					res.redirect("/polls/results/"+req.params.id);
				});
			}
		});
	}
});

module.exports = router;