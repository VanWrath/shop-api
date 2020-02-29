var mongoose = require('mongoose');
var Schema = mongoose.Schema; //creates the scheme behind your data
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishList = new Schema({
	title    : { type: String, default: 'Your Wish List' }, //more options for types.
	products : [ { type: ObjectId, ref: 'Product' } ] //collection of products. reference type is products that was exported.
});

module.exports = mongoose.model('WishList', wishList);
