const APIController = (function(fetch){

	function submitEntry(data){

		fetch(

			'http://159.203.117.240/api/v1/entries/',

			{

				headers: { "Content-Type": "application/json" },
				method: "GET",
				body: JSON.stringify(data),

			}

		)
		.then( (res) => {

			console.log(res);

		} )
		.catch( (res) => {

			console.log(res);

		});

	}

	return {
		submitEntry: submitEntry,
	}

})(window.fetch);