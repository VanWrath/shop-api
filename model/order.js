var mongoose = require('mongoose');
var Schema = mongoose.Schema; //creates the scheme behind your data
var ObjectId = mongoose.Schema.Types.ObjectId;

const order = new Schema({
	user     : { type: ObjectId, ref: 'User' },
	products : [ { type: ObjectId, ref: 'Products' } ],
	total    : Number,
	date     : Date
});

module.exports = mongoose.model('Order', order);
