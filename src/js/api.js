const APIController = (function(fetch){

	function submitEntry(data){

		fetch(

			'http://159.203.117.240/api/entries/',

			{

				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify(data),

			}

		)
		.then( (res) => {

			console.log(res);

		} )
		.catch( (res) => {

			throw new Error(res);

		});

	}

	function getRandomEntries(n){

		let url = 'http://159.203.117.240/api/recent/' + n + '/';

		fetch(

			url,

			{
				method: "GET",
			}

		)
		.then( (res) => {

			let d = res.character;
			console.log(d);

		} )
		.catch( (res) => {

			throw new Error(res);

		} )

	}

	return {
		submitEntry: submitEntry,
		getRandomEntries: getRandomEntries,
	}

})(window.fetch);