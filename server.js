var express = require('express'); //import express library
var app = express();
var bodyParser = require('body-parser'); //
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:/shop', { useNewUrlParser: true });

var Product = require('./model/product');
var WishList = require('./model/wishlist');

//Google Cloud Firestore server client library
const Firestore = require('@google-cloud/firestore');

const fsdb = new Firestore({
	projectId   : 'react-shop-api',
	keyFilename : './react-shop-api-141bcc2fc161.json'
});

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
	/*	var productList = [];
	var productsRef = fsdb.collection('products');
	var promise = productsRef
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				productList.push(doc.data());
				console.log(doc.id, '=>', doc.data());
			});
		})
		.catch((err) => {
			console.log('Error getting documents', err);
			res.status(500).send({ error: 'Could not fetch products' });
		});
	res.send(productList);*/

	Product.find({}, function(err, products) {
		//async function, .find() always returns an array.
		if (err) {
			res.status(500).send({ error: 'Could not fetch products' });
		} else {
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

app.listen(3003, function() {
	console.log('Swag shop running on port 3003...');
});
