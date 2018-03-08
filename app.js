const express = require('express');
const app = express();
const path = require('path');
const API = require('./js/API');

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.get('/view/:id', (req, res) => {

	const id = "Bryan Wong";

	res.render('./views/index', {
		id: id,
	});
	// API.getEntry(id)
	// .then( res => {
		
	// })
	// .catch( res => {
	// 	throw new Error(res);
	// });

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))