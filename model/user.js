var mongoose = require('mongoose');
var Schema = mongoose.Schema; //creates the scheme behind your data
var ObjectId = mongoose.Schema.Types.ObjectId;

const user = new Schema({
	email    : String,
	name     : String,
	address  : String,
	phone    : String,
	wishlist : [ { type: ObjectId, ref: 'WishList' } ],
	cart     : [ { type: ObjectId, ref: 'Product' } ],
	orders   : [ { type: ObjectId, ref: 'Order' } ]
});

module.exports = mongoose.model('User', user);
