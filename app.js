const express = require('express');
const app = express();
const path = require('path');
const API = require('./api');

app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname + '/public')));

app.get('/view/:id', (req, res) => {

	const id = req.params.id;

	res.render(path.join(__dirname, 'views/index'), {
		id: id,
	});

	// API.getEntry(id)
	// .then( resp => {
	// 	v = resp;
	// 	res.render('views/index', {
	// 		id: id,
	// 	});
	// })
	// .catch( resp => {
	// 	throw new Error(res);
	// });

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))