var mongoose = require('mongoose');
var Schema = mongoose.Schema; //creates the scheme behind your data
var ObjectId = mongoose.Schema.Types.ObjectId;

var product = new Schema({
	title       : String,
	brand       : String,
	price       : Number,
	imgUrl      : String,
	description : String,
	reviews     : [
		{
			title  : String,
			user   : { type: ObjectId, ref: 'Product' },
			date   : Date,
			review : String
		}
	],
	rating      : { type: Number, default: 5 },
	quantity    : Number
});

module.exports = mongoose.model('Product', product); //exports the product model to other modules.
