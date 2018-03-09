const express = require('express');
const app = express();
const path = require('path');
const API = require('./api');

app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname + '/public')));

app.get('/view/:id', (req, res) => {
	const id = req.params.id;

	API.getEntry(id)
	.then( resp => {
		res.render('index', {
			entry: resp,
		});
	})
	.catch( err => {
		res.render('index', {
			entry: err,
		})
	});
});

app.listen(3000, () => console.log('Running on port 3000'));
