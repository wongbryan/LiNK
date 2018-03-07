const UIController = (function(){

	var title = document.getElementById('title');

	var quoteInput = document.getElementById('quoteInput'),
	quoteInputButton = quoteInput.getElementsByClassName('submitButton')[0],
	prompt = document.getElementById('prompt'),
	quoteInputAnswer = document.getElementById('userAnswer'),
	remaining = document.getElementById('userAnswerRemaining'),
	answerMax = 250;

	var quoteMain = document.getElementById('quoteMain'),
	quoteMainAnswer = document.getElementById('quoteMainAnswer'),
	quoteMainClose = document.getElementById('quoteMainClose');

	/* TITLE SCREEN */

	var titleBlur = 0;
	var opacity = 1;
	var mousedownID = -1;  //Global ID of mouse down interval
	function mousedown(event) {

		if(mousedownID==-1)  //Prevent multiple loops!
			mousedownID = setInterval(whilemousedown.bind(this), 25 /*execute every 100ms*/);

		let instr = this.getElementsByTagName('p')[0];
		instr.classList.remove('blinkAnim');
		hide(instr);

	}

	function mouseup(event) {
	   if(mousedownID!=-1) {  //Only stop if exists
	     clearInterval(mousedownID);
	     mousedownID=-1;
	   }

	   let instr = this.getElementsByTagName('p')[0];
	   instr.classList.add('blinkAnim');
	   hide(instr);

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

		hideQuoteInput();

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

	/* Util functions for navigation */

	function showTitle(){
		show(title);
	}

	function hideTitle(){
		hide(title);
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

	function showQuoteInput(){
		show(quoteInput);
	}	

	function hideQuoteInput(){
		hide(quoteInput);
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

	
	
	return{
		showTitle: showTitle,
		hideTitle: hideTitle,
		showQuoteMain: showQuoteMain,
		hideQuoteMain: hideQuoteMain,
		showQuoteInput: showQuoteInput,
		hideQuoteInput: hideQuoteInput,
	}

})();