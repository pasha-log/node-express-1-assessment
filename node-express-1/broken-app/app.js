const express = require('express');
const axios = require('axios');
const ExpressError = require('./expressError');
const app = express();

app.use(express.json());

app.post('/', async (req, res, next) => {
	try {
		let devs = req.body.developers;

		let url = 'https://api.github.com/users/';
		try {
			let result = await Promise.all(
				devs.map(async (d) => {
					const response = await axios.get(`${url}${d}`);
					return { name: response.data.name, bio: response.data.bio };
				})
			);
		} catch (e) {
			return next(e);
		}
		return res.status(200).json(result);
	} catch (e) {
		return next(e);
	}
});

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ "name": r.data.name, "bio": r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch(e) {
//     return next(e);
//   }
// });

/** 404 handler */

app.use(function(req, res, next) {
	return new ExpressError('Not Found', 404);
});

/** general error handler */

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err.message
	});
});

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});
