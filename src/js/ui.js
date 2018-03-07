const UIController = (function(){

	var title = document.getElementById('title');

	var quoteInput = document.getElementById('quoteInput'),
	quoteInputButton = quoteInput.getElementsByClassName('submitButton')[0],
	prompt = document.getElementById('prompt'),
	quoteInputAnswer = document.getElementById('userAnswer'),
	remaining = document.getElementById('userAnswerRemaining'),
	answerMax = 250;

	var quoteMain = document.getElementById('quoteMain'),
	quoteMainAnswer = document.getElementById('quoteAnswer'),
	quoteMainButton = quoteMain.getElementsByClassName('close')[0];

	/* TITLE SCREEN */

	var titleBlur = 0;
	var opacity = 1;
	var mousedownID = -1;  //Global ID of mouse down interval
	function mousedown(event) {

		if(mousedownID==-1)  //Prevent multiple loops!
			mousedownID = setInterval(whilemousedown.bind(this), 25 /*execute every 100ms*/);

	}

	function mouseup(event) {
	   if(mousedownID!=-1) {  //Only stop if exists
	     clearInterval(mousedownID);
	     mousedownID=-1;
	   }

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
	   if(opacity <= 0){
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
		let otherAns = quoteMain.getElementsByClassName('quoteAnswer')[0],
		username = quoteMain.getElementsByClassName('username')[0];

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
		elem.classList.remove('fadeIn');
		elem.classList.add('fadeOut');
	}

	function show(elem){
		elem.classList.remove('fadeOut');
		elem.classList.add('fadeIn');
	}

	quoteMainButton.addEventListener('mousedown', hideQuoteMain);

	return{
		showTitle: showTitle,
		hideTitle: hideTitle,
		showQuoteMain: showQuoteMain,
		hideQuoteMain: hideQuoteMain,
		showQuoteInput: showQuoteInput,
		hideQuoteInput: hideQuoteInput,
	}

})();