var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	id: String,
	email: String,
	first: String,
	last: String,
	link: String, //image
	name: String,
	url: String,
	//address
});

UserSchema.index({id: 1}, {unique: true});
mongoose.model('User', UserSchema);