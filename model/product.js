var mongoose = require('mongoose');
var Schema = mongoose.Schema; //creates the scheme behind your data

var product = new Schema({
	title : String,
	price : Number,
	likes : { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', product); //exports the product model to other modules.
