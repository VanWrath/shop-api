const express = require('express'); //import express library
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser'); //
const mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost:/shop', { useNewUrlParser: true });
const db = mongoose.connect(
	'mongodb+srv://kyle:Fantasy710@cluster0-9yquw.mongodb.net/test?retryWrites=true&w=majority',
	{
		useNewUrlParser : true,
		dbName          : 'react-shop'
	}
);
var Product = require('./model/product');
var WishList = require('./model/wishlist');
const User = require('./model/user');

const app = express();

// Accept cross-origin requests from the frontend app
app.use(cors({ origin: 'http://localhost:3001' }));

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET, UPATE, DELETE');
	next();
});

//Set up Auth0 configuratioon
const authConfig = {
	domain   : 'dev-e4xqtzrx.auth0.com',
	audience : 'https://api.kylevannarath.ca'
};

// Define middleware that validates incoming bearer tokens using JWKS
const checkJwt = jwt({
	secret    : jwksRsa.expressJwtSecret({
		cache                 : true,
		rateLimit             : true,
		jwksRequestsPerMinute : 5,
		jwksUri               : `https://${authConfig.domain}/.well-known/jwks.json`
	}),

	audience  : authConfig.audience,
	issuer    : `https://${authConfig.domain}/`,
	algorithm : [ 'RS256' ]
});

//allow express to use the bodyParser middleware
app.use(bodyParser.json()); //converts requests to json
app.use(bodyParser.urlencoded({ extended: false })); //only work with data that is properly formatted

/*POST operations*/

//adds a new product to the list
app.post('/product', function(req, res) {
	var product = new Product();
	product.title = req.body.title;
	product.price = req.body.price;
	product.imgUrl = req.body.imgUrl;
	product.description = req.body.description;
	product.save(function(err, savedProduct) {
		//stores the data in product collection
		if (err) {
			res.status(500).send({ error: 'Could not save product' });
			console.log(err);
		} else {
			res.status(200).send(savedProduct);
		}
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
			res.status(200).send(newWishList);
		}
	});
});

app.post('/user', (req, res) => {
	const user = new User();
	user.email = req.body.email;
	user.name = req.body.name;

	user.save((err, newUser) => {
		if (err) {
			res.status(500).send({ error: 'could not addd user' });
		} else {
			res.status(200).send(newUser);
		}
	});
});

/*GET operations*/

// Define an endpoint that must be called with an access token
app.get('/api/external', checkJwt, (req, res) => {
	res.send({
		msg : 'Your Access Token was successfully validated!'
	});
});

//endpoint that retrieves product list
app.get('/product', function(req, res) {
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
			res.status(500).send();
		}
		res.send(wishLists);
	});
});

app.get('/user', (req, res) => {
	User.findOne({ _id: req.body._id }, (err, user) => {
		if (err) {
			res.status(500).send({ error: 'Could not find user' });
		} else {
			res.status(200).send(user);
		}
	});
});
/*PUT operations*/

app.put('/product', (req, res) => {
	Product.updateOne({ _id: req.body._id }, (err, res) => {
		if (err) {
			res.status(500).send({ error: 'Could not update item' });
		} else {
			res.send('Succcessfully updated item');
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

/*DELETE operations*/

//deletes item from products
app.delete('/product', (req, res) => {
	Product.deleteOne({ _id: req.body._id }, (err) => {
		if (err) {
			return res.status(500).send({ error: 'could not delete item.' });
		} else {
			res.send('Successfully deleted item.');
		}
	});
});

//deletes a list from wishlists
app.delete('/wishlist', (req, res) => {
	WishList.deleteOne({ _id: req.body._id }, (err) => {
		if (err) {
			res.status(500).send({ error: 'Could not delete list' });
		} else {
			res.status(200).send({ message: 'Item sucessfully deleted' });
		}
	});
});

app.listen(3003, () => {
	console.log('API listening on port 3003...');
});
