const express = require('express'); //import express library
const app = express();
const bodyParser = require('body-parser'); //
const mongoose = require('mongoose');
const config = require("./authConfig.json");

const PORT = process.env.PORT || 5000

//var db = mongoose.connect('mongodb://localhost:/shop', { useNewUrlParser: true });
var db = mongoose.connect(
	config.dbUrl,
	{
		useNewUrlParser : true,
		dbName          : 'Shop'
	}
);

var Product = require('./model/product');
var WishList = require('./model/wishlist');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET');
	next();
});

//allow express to use the bodyParser middleware
app.use(bodyParser.json()); //converts requests to json
app.use(bodyParser.urlencoded({ extended: false })); //only work with data that is properly formatted

//adds a new product to the list
app.post('/product', function(req, res) {
	var product = new Product();
	product.title = req.body.title;
	product.price = req.body.price;
	product.save(function(err, savedProduct) {
		//stores the data in product collection
		if (err) {
			res.status(500).send({ error: 'Could not save product' });
		} else {
			res.status(200).send(savedProduct);
		}
	});
});

//retrieves product list
app.get('/product', function(req, res) {
	Product.find({}, function(err, products) {
		//async function, .find() always returns an array.
		if (err) {
			res.status(500).send({ error: 'Could not fetch products' });
		} else {
			console.log('Products retrieved');
			res.send(products);
		}
	});
});

//returns data to a wishlist
app.get('/wishlist', function(req, res) {
	WishList.find({}).populate({ path: 'products', model: 'Product' }).exec(function(err, wishLists) {
		//populates the list with actual data instead of just an id.
		if (err) {
			res.status(500).send;
		}
		res.send(wishLists);
	});
});

//creates a new wishlist
app.post('/wishlist', function(req, res) {
	var wishList = new WishList();
	wishList.title = req.body.title;

	wishList.save(function(err, newWishList) {
		if (err) {
			res.status(500).send({ error: 'Could not create wishlist' });
		} else {
			res.send(newWishList);
		}
	});
});

//adds items to wishlist
app.put('/wishlist/product/add', function(req, res) {
	Product.findOne({ _id: req.body.productId }, function(err, product) {
		if (err) {
			res.status(500).send({ error: 'Could not add product to wishlist' });
		} else {
			WishList.update({ _id: req.body.wishListId }, { $addToSet: { products: product._id } }, function(
				err,
				wishList
			) {
				if (err) {
					res.status(500).send({ error: 'Could not add product to wishlist' });
				} else {
					res.send('Successfully added to wishlist');
				}
			});
		}
	});
});

app.listen(PORT, () => {
	console.log(`Hobby shop running on port ${PORT}...`);
});
