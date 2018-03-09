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
	expiration = document.getElementById('expiration');

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
		showDonation();

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

		otherAns.innerHTML = data.quote;
		username.innerHTML = "-" + data.username;

		quoteMain.classList.add('fadeIn');
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

	/* DONATION BOX STUFF */

	function submitDonation(e){
		let nameVal = name.value,
		numberVal = number.value,
		cvvVal = cvv.value,
		expirationVal = expiration.value;

		let card = {
			'name': nameVal,
			'number': numberVal,
			'cvv': cvvVal,
			'expiration': expirationVal
		};

	}

	donationClose.addEventListener('mousedown', hideDonation);
	donationSubmit.addEventListener('mousedown', submitDonation);
	
	return{
		showTitle: showTitle,
		hideTitle: hideTitle,
		showQuoteMain: showQuoteMain,
		hideQuoteMain: hideQuoteMain,
		showQuoteInput: showQuoteInput,
		hideQuoteInput: hideQuoteInput,
	}

})();