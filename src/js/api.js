const APIController = (function(fetch){

	function submitEntry(data){

		fetch(

			'http://159.203.117.240/api/v1/entries/',

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

	function getRandomEntry(){

		fetch(

			'http://159.203.117.240/api/v1/entries/',

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
		getRandomEntry: getRandomEntry,
	}

})(window.fetch);