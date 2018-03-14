(function(fetch){

	fetch("https://freegeoip.net/json/",  

	function(data) {
	    var country_code = data.country_code;
	    var country = data.country_name;
	    var ip = data.ip;
	    var time_zone = data.time_zone;
	    var latitude = data.latitude;
	    var longitude = data.longitude;

	    alert("Country Code: " + country_code);
	    alert("Country Name: " + country);
	    alert("IP: " + ip); 
	    alert("Time Zone: " + time_zone);
	    alert("Latitude: " + latitude);
	    alert("Longitude: " + longitude);   

	})
	.then( res => {

		res.json()
		.then( d => {

			locationData = d;
			user_data.location = locationData['city'] || locationData['region_name'] || locationData['country_name'] || user_data.location;

		})
		.catch( e => {
			
			throw new Error(e);

		})

	})
	.catch( err => {

		throw new Error(err);

	})

})(window.fetch);