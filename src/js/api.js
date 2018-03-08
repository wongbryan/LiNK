const apibase = 'http://159.203.117.240/api/';

const APIController = (function(fetch){

	function postEntry(data){

		try {
			const response = await fetch(apibase + "entries/", {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is your entry: ", json);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	function putEntry(id, data){

		try {
			const response = await fetch(apibase + "entries/" + id, {
				method: 'PUT',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is your updated entry: ", json);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	function getLatestDonorEntries(n){

		try {
			const response = await fetch(apibase + "latest/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" },
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is all of the latest donor entries: ", json.entries);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	function getRecentEntries(n){

		try {
			const response = await fetch(apibase + "recent/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" },
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is all of the recent entries: ", json.entries);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	function getTopDonorEntries(n){

		try {
			const response = await fetch(apibase + "top/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" },
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is all of the top donors in order: ", json.entries);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	function getEntry(id){

		try {
			const response = await fetch(apibase + "entries/" + id, {
				method: 'GET',
				headers: { "Content-Type": "application/json" },
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is the entry you searched for: ", json);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	function getTotalDonations(){

		try {
			const response = await fetch(apibase + "donations/", {
				method: 'GET',
				headers: { "Content-Type": "application/json" },
			});

			const status = await response.status;
			if (status >= 200 && status < 300) {
				const json = await response.json;
				console.log("This is the total donations in cents: ", json.total);
			} else {
				throw new Error(status);
			}
		} catch(e) {
			throw new Error(e.message);
		}

	}

	return {
		submitEntry: submitEntry,
		getRandomEntries: getRandomEntries,
	}

})(window.fetch);