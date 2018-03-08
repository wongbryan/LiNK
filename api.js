const request = require('request-promise');

const url = 'http://159.203.117.240/api/';

const API = (function() {

	function getEntry(id){

		const path = url + 'name/' + id;

		const options = {
		  method: 'GET',
		  json: true,
		  uri: 'http://159.203.117.240/api/name/asdfa',
		}
		
		return (request('http://159.203.117.240/api/name/asdfa')
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