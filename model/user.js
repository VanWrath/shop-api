var mongoose = require('mongoose');
var Schema = mongoose.Schema; //creates the scheme behind your data
var ObjectId = mongoose.Schema.Types.ObjectId;

const user = new Schema({
	email    : String,
	name     : String,
	address  : String,
	phone    : String,
	produts  : [ { type: ObjectId, ref: 'Product' } ],
	wishlist : [ { type: ObjectId, ref: 'Product' } ],
	cart     : [ { type: ObjectId, ref: 'Product' } ]
});

module.exports = mongoose.model('User', user);
