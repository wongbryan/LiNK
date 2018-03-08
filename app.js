const express = require('express');
const app = express();
const path = require('path');
const API = require('./js/API');
// const getEntry = require('./js/API');

// app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', express.static('public'));

app.get('/view/:id', (req, res) => {

	const id = "Bryan Wong";
		let v;

	API.getEntry(id)
	.then( res => {
		v = res;
		console.log(JSON.parse(v));
	})
	.catch( res => {
		throw new Error(res);
	});

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))