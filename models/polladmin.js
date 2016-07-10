var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var polladminSchema = new Schema({
	username: String,
	pwhash: String,
	pwsalt: String
});

module.exports = mongoose.model('polladmin', polladminSchema);