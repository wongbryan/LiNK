const UIController = (function(){

	var title = document.getElementById('title');

	var quoteInput = document.getElementById('quoteInput'),
	quoteInputButton = quoteInput.getElementsByClassName('submitButton')[0],
	prompt = document.getElementById('prompt'),
	quoteInputAnswer = document.getElementById('userAnswer'),
	remaining = document.getElementById('userAnswerRemaining'),
	answerMax = 250;

	var nameInput = document.getElementById('nameInput'),
	nameInputAnswer = document.getElementById('nameInputAnswer'),
	nameInputClose = nameInput.getElementsByClassName('submitButton')[0];

	var quoteMain = document.getElementById('quoteMain'),
	quoteMainAnswer = document.getElementById('quoteMainAnswer'),
	quoteMainClose = document.getElementById('quoteMainClose');

	var donation = document.getElementById('donation'),
	donationForm = document.getElementById('donationForm'),
	donationClose = document.getElementById('donationClose'),
	donationSubmit = document.getElementById('donationSubmit'),
	donationQuoteAnswer = document.getElementById('donationQuoteAnswer'),
	name = document.getElementById('name'),
	cvv = document.getElementById('cvv'),
	number = document.getElementById('number'),
	expiration = document.getElementById('expiration'),
	amount = document.getElementById('amount'),
	email = document.getElementById('email');

	let errorList = document.querySelector('#error')


	/* TITLE SCREEN */

	var titleBlur = 0;
	var opacity = 1;
	var mousedownID = -1;  //Global ID of mouse down interval
	function mousedown(event) {

		if(mousedownID==-1)  //Prevent multiple loops!
			mousedownID = setInterval(whilemousedown.bind(this), 25 /*execute every 100ms*/);

		let instr = this.getElementsByTagName('p')[0];
		instr.classList.remove('blinkAnim');

	}

	function mouseup(event) {
	   if(mousedownID!=-1) {  //Only stop if exists
		 clearInterval(mousedownID);
		 mousedownID=-1;
	   }

	   let instr = this.getElementsByTagName('p')[0];
	   instr.classList.add('blinkAnim');

	   var interval = setInterval(function(){
			if(titleBlur <= 0 && opacity >= 1){
				clearInterval(interval);
				return;
			}
			titleBlur--;
			var el = this;
			el.style.filter = "blur(" + titleBlur + "px)";

			opacity = opacity > 1 ? 1 : opacity + .01;
			el.style.opacity = opacity;

	   }.bind(this), 25);

	}

	function whilemousedown() {
	   var el = this;
	   if(opacity <= 0 || titleBlur >= 60){
		showNameInput();
		WORLD_CONTROLLER.setMainLightIntensity(.3);
		el.style.display = 'none';
		clearInterval(mousedownID);
		mousedownID = -1;
		return;
	   }
	   titleBlur++;
	   el.style.filter = "blur(" + titleBlur + "px)";

	   opacity -= .01;
	   el.style.opacity = opacity;
	}

	title.addEventListener("mousedown", mousedown);
	title.addEventListener("mouseup", mouseup);
	title.addEventListener("mouseout", mouseup);


	/* USER INPUT ANSWER SCREEN */

	function onAnswerSubmit(e){

		if(e)
			e.preventDefault();

		let ans = quoteInputAnswer.value;
		user_data.text = ans;
		ans = stylizeQuote(ans);
		donationQuoteAnswer.innerHTML = ans;

		hideQuoteInput();
		// WORLD_CONTROLLER.shrinkStarField(1200);
		WORLD_CONTROLLER.sizeStarField(1, 100, 60, .1, 300);
		WORLD_CONTROLLER.moveCamera('side');
		paused = false;

		setTimeout(function(){

			//Good for poop dude
		    let idleAnims = getIdleAnim(testMesh)
		    
		    //Start animations
		    idleAnims.forEach( elem => {
			elem.start()
		    });

		}, 800);

		APIController.postEntry(user_data);

		return false;
	}

	function ansKeyDown(e){

		if(e.which == 13) {
			e.preventDefault();
			onAnswerSubmit();
		}

		let el = e.target;
		el.style.height = el.scrollHeight + 'px';

		let amt = answerMax - el.value.length;
		remaining.innerHTML = amt;

	}

	function keepBlur(){
		var el = this;
		el.focus();
	}

	function handleKeyDown(e){

		if(paused){

			return;

		}

		if(e.keyCode === 32  && e.target === document.body ){ //space
	        
			WORLD_CONTROLLER.setRotationFactor(-.005);

	    }

	}

	function handleKeyUp(e){

		if(e.keyCode === 32){

			WORLD_CONTROLLER.setRotationFactor(0);

		}

	}

	quoteInputButton.addEventListener('mousedown', onAnswerSubmit);
	quoteInputAnswer.addEventListener('keydown', ansKeyDown);
	quoteInputAnswer.addEventListener('blur', keepBlur);

	/* NAME INPUT SCREEN */

	function onNameInputSubmit(e){

		e.preventDefault();

		let name = nameInputAnswer.value;
		user_data.name = name;

		hideNameInput();
		showQuoteInput();

	}
	nameInputClose.addEventListener('mousedown', onNameInputSubmit);

	/* Util functions for navigation */

	function showTitle(){
		show(title);
	}

	function hideTitle(){
		hide(title);
	}

	function showQuoteInput(){
		show(quoteInput);
	}	

	function hideQuoteInput(){
		hide(quoteInput);
	}

	function showNameInput(){
		show(nameInput);
	}

	function hideNameInput(){
		hide(nameInput);
	}

	function showQuoteMain(data){
		let answer = document.getElementById('quoteMainAnswer'),
		username = document.getElementById('quoteMainUser');

		answer.innerHTML = data.text;
		username.innerHTML = "-" + data.name;

		show(quoteMain);
	}

	function hideQuoteMain(){
		hide(quoteMain);
	}

	function showDonation(){
		show(donation);
	}

	function hideDonation(){
		hide(donation);
	}

	function hide(elem){
		elem.classList.remove('fadeInBlur');
		elem.classList.add('fadeOutBlur');
	}

	function show(elem){
		elem.classList.remove('fadeOutBlur');
		elem.classList.add('fadeInBlur');
	}

	quoteMainClose.addEventListener('mousedown', hideQuoteMain);
	quoteMainClose.addEventListener('mousedown', function(){

		WORLD_CONTROLLER.executeAction(checkpointIndex);
		paused = false;

	});

	/* DONATION BOX STUFF */
	let card_token = "";


	function errorDisplay(errors){

		if (Object.keys(errors).length != 0)
			errorList.innerHTML = "detected error(s):";

		for (const [key, err] of Object.entries(errors)) {
			let errorItem = document.createElement('li');
			errorItem.innerHTML = err.message;
			errorList.appendChild(errorItem);
		}
	}

	function checkDonation(card){
		let result = []

		const dollar_regex = /^\d+(?:\.\d{0,2})$/;

		if (!dollar_regex.test(card.amount)) {
			let resultItem = {
				message: 'Invalid dollar amount'
			}
			result[0] = resultItem;
		}

		errorDisplay(result);
		return (Object.keys(result).length == 0)
	}

	async function submitDonation(card_token){
		/* clear error display */
		while (errorList.firstChild) {
			errorList.removeChild(errorList.firstChild);
		}

		let nameVal = name.value,
		numberVal = number.value,
		cvvVal = cvv.value,
		expirationVal = expiration.value,
		amountVal = amount.value,
		emailVal = email.value;


		let card = {
			'name': nameVal,
			'number': numberVal,
			'cvv': cvvVal,
			'expiration': expirationVal,
			'amount': amountVal,
		};

		if (checkDonation(card)) {

			const donation = amountVal * 100;
			const destination = "73-1710135";
			const currency = "usd";
			const payload = {
				"source": card_token,
				"amount": donation,
				"destination": destination,
				"receipt_email": emailVal,
				"currency": currency
			}

			try {
				const response = await fetch("https://api.pandapay.io/v1/donations", {
					method: 'POST',
					headers: {
						'Content-Type': "application/json; charset=utf-8",
						'Authorization': 'Basic ' + btoa('PLACE KEY HERE' + ':'),
					},
					body: JSON.stringify(payload),
				});
				const status = await response.status;
				if (status >= 200 && status < 300) {
					const json = await response.json();
					console.log(json);
					return true;
				} else {
					throw new Error(status);
				}
			}catch(e){
				let err = {}
				if (e.message >= 500)
					err[0] = {message: 'The service we use for payments is down/undermaintennance.  Come back another time! Error: ' + e.message}
				else
					err[0] = {message: 'Your request could not be sent :( ' + e.message}

				errorDisplay(err);
				throw new Error(e.message);
			}
		}
		return false
	}

	donationClose.addEventListener('mousedown', hideDonation);

	return{
		showTitle: showTitle,
		hideTitle: hideTitle,
		showQuoteMain: showQuoteMain,
		hideQuoteMain: hideQuoteMain,
		showDonation: showDonation,
		showQuoteInput: showQuoteInput,
		hideQuoteInput: hideQuoteInput,
		handleKeyDown: handleKeyDown,
		handleKeyUp: handleKeyUp,
		submitDonation: submitDonation,
		errorDisplay: errorDisplay,
	}

})();