const request = require('request-promise');

const url = 'http://159.203.117.240/api/';

const API = (function() {

	function getEntry(id){
		const options = {
		  method: 'GET',
		  json: true,
		  uri: url + 'entries/' + id,
		}
		
		return (request(options)
		.then( res => {
			return res;
		})
		.catch( err => {
			throw new Error(err);
		}));
	}

	return {
		getEntry: getEntry,
	}

})();

module.exports = API;