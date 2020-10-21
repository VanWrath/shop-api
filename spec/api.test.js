var request = require('request');

test('adds 1 + 1 to equal 2', () => {
	console.log('test 0');
	expect(1 + 1).toBe(2);
});

test('get list of products', (done) => {
	console.log('test 1');
	request.get('http://localhost:3003/product', (err, res) => {
		console.log(res.body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

test('get user by id', (done) => {
	console.log('test 2');
	var data = {
		_id : '5e6b3541fdc5ca3c50dde6d4'
	};
	request.get({ url: 'http://localhost:3003/user', form: data }, (err, res) => {
		console.log(res.body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

test('get user by email', (done) => {
	console.log('test 3');
	var data = {
		email : 'kai710@live.com'
	};
	request.get({ url: 'http://localhost:3003/user', form: data }, (err, res) => {
		console.log(res.body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

// test('create a new product', (done) => {
// 	console.log('test 4');
// 	const data = {
// 		title       : 'FINAL FANTASY® VII REMAKE',
// 		price       : 59.99,
// 		imgUrl      :
// 			'https://cdn-prod.scalefast.com/public/assets/img/resized/squareenix-store-v3/df5313d5528cafec58d0163d3c4036e7_KR_350.jpg',
// 		description :
// 			'The world has fallen under the control of the Shinra Electric Power Company, a shadowy corporation controlling the planet’s very life force as mako energy. In the sprawling city of Midgar, an anti-Shinra organization calling themselves Avalanche have stepped up their resistance. Cloud Strife, a former member of Shinra’s elite SOLDIER unit now turned mercenary, lends his aid to the group, unaware of the epic consequences that await him.'
// 	};

// 	request.post({ url: 'http://localhost:3003/product', form: data }, (error, res, body) => {
// 		if (error) {
// 			console.error(error);
// 			return;
// 		}
// 		//console.log(res);
// 		console.log(body);
// 		//id = body._id;
// 		expect(res.statusCode).toEqual(200);
// 		done();
// 	});
// });

// test('delete products', (done) => {
// 	console.log('test 5');
// 	const data = {
// 		_id : '5eba49a0afb1421c5c3ba94a'
// 	};
// 	request.del({ url: 'http://localhost:3003/product', form: data }, (error, res, body) => {
// 		if (error) {
// 			console.error(error);
// 			return;
// 		}
// 		//console.log(res);
// 		console.log(body);
// 		expect(res.statusCode).toEqual(200);
// 		done();
// 	});
// });

test('search product', (done) => {
	console.log('test 6');
	var data = {
		text : 'final'
	};
	request.get({ url: 'http://localhost:3003/search', form: data }, (err, res) => {
		console.log(res.body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

test('update product', (done) => {
	console.log('test 7');
	var data = {
		_id         : '5eba48d3afb1421c5c3ba946',
		title       : 'FINAL FANTASY® VII REMAKE',
		price       : 59.99,
		imgUrl      :
			'https://cdn-prod.scalefast.com/public/assets/img/resized/squareenix-store-v3/df5313d5528cafec58d0163d3c4036e7_KR_350.jpg',
		description :
			'The world has fallen under the control of the Shinra Electric Power Company, a shadowy corporation controlling the planet’s very life force as mako energy. In the sprawling city of Midgar, an anti-Shinra organization calling themselves Avalanche have stepped up their resistance. Cloud Strife, a former member of Shinra’s elite SOLDIER unit now turned mercenary, lends his aid to the group, unaware of the epic consequences that await him.'
	};

	request.put({ url: 'http://localhost:3003/product', form: data }, (error, res, body) => {
		if (error) {
			console.error(error);
			done();
		}
		//console.log(res);
		console.log(body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

test('update user', (done) => {
	console.log('test 8');
	var data = {
		_id      : '5e6b3541fdc5ca3c50dde6d4',
		products : [],
		wishlist : [],
		cart     : [],
		email    : 'kai710@live.com',
		name     : 'Kyle Vann'
	};

	request.put({ url: 'http://localhost:3003/user', form: data }, (error, res, body) => {
		if (error) {
			console.error(error);
			done();
		}
		//console.log(res);
		console.log(body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

// test('create new user', (done) => {
// 	console.log('test 9');
// 	const data = {
// 		name  : 'David Lee',
// 		email : 'david_lee@hotmail.com'
// 	};

// 	request.post({ url: 'http://localhost:3003/user', form: data }, (error, res, body) => {
// 		if (error) {
// 			console.error(error);
// 			done();
// 		}
// 		//console.log(res);
// 		console.log(body);
// 		done();
// 	});
// });

// test('delete user', (done) => {
// 	console.log('test 10');
// 	const data = {
// 		_id   : '5edeba6cc1153a33d0e5d292',
// 		name  : 'David Lee',
// 		email : 'david_lee@hotmail.com'
// 	};

// 	request.del({ url: 'http://localhost:3003/user', form: data }, (error, res, body) => {
// 		if (error) {
// 			console.error(error);
// 			return;
// 		}
// 		//console.log(res);
// 		console.log(body);
// 		expect(res.statusCode).toEqual(200);
// 		done();
// 	});
// });

/* test updating user metadata */
test('update metadata', (done) => {
	console.log('test 11');
});
