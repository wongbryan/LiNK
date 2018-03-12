const PaymentController = (function(){

	function checkDonation(card){
		let result = {
			err: true,
			message: 'No Error Found'
		}

		const dollar_regex = /^\d+(?:\.\d{0,2})$/;
		const exp_regex = /(0[1-9]|10|11|12)\/20[0-9]{2}$/;

		if (!dollar_regex.test(card.amount))
			result.err = false;
			result.message = 'Invalid dollar amount';
		if (!exp_regex.test(card.expiration))
			result.err = false;
			result.message = 'Invalid expiration date';

		/*
		return type:
				{
					'err': true or false,
					'message': 'error message'
				}
		*/

		return result;
	}

	return{
		checkDonation: checkDonation
	}

})();
