var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	timestamp: Number,
	hash: String,
	question: String,
	answers: [{
		count: Number,
		text: String
	}],
	totalCount: Number,
	active: Boolean
});

module.exports = mongoose.model('poll', pollSchema);