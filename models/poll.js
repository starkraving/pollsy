var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	hash: String,
	question: String,
	answers: [{
		count: Number,
		text: String
	}],
	active: Boolean
});

module.exports = mongoose.model('poll', pollSchema);