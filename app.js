const express = require('express');
const app = express();
const path = require('path');
const API = require('./api');
require('dotenv').config()

/* cross origin */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Auth-Token, Content-Type, Accept");
  next();
});

app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {

	res.render('index-main', {
		PANDA_PUBLIC_KEY: process.env.PANDA_PUBLIC_KEY,
		PANDA_SECRET_KEY: process.env.PANDA_SECRET_KEY,
	});

});

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
