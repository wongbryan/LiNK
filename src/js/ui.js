const UIController = (function(){

	var title = document.getElementById('title'),
	prompt = document.getElementById('prompt'),
	answer = document.getElementById('userAnswer'),
	userSubmitQuote = document.getElementById('userSubmitQuote'),
	remaining = document.getElementById('userAnswerRemaining'),
	answerMax = 250;

	var quoteBoxMain = document.getElementById('quoteBoxMain'),
	quoteAnswer = document.getElementById('quoteAnswer'),
	quoteClose = quoteBoxMain.getElementsByClassName('close')[0];

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
	   		if(titleBlur <= 0){
	   			clearInterval(interval);
	   			return;
	   		}
		   	titleBlur--;
			var el = this;
			el.style.filter = "blur(" + titleBlur + "px)";
	   }.bind(this), 25);

	}

	function whilemousedown() {
	   titleBlur++;
	   var el = this;
	   el.style.filter = "blur(" + titleBlur + "px)";

	   opacity -= .005;
	   el.style.opacity = opacity;
	}

	title.addEventListener("mousedown", mousedown);
	title.addEventListener("mouseup", mouseup);
	title.addEventListener("mouseout", mouseup);

	/* USER INPUT ANSWER SCREEN */

	function onAnswerSubmit(e){

		if(e)
			e.preventDefault();

		let ans = answer.value;
		console.log(ans);

		title.classList.add('fadeOut');

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

	userSubmitQuote.addEventListener('mousedown', onAnswerSubmit);
	answer.addEventListener('keydown', ansKeyDown);
	answer.addEventListener('blur', keepBlur);

	/* QUOTE PAGE FROM OTHER USERS */

	function showQuoteMain(data){

		let otherAns = quoteBoxMain.getElementsByClassName('quoteAnswer')[0],
		username = quoteBoxMain.getElementsByClassName('username')[0];

		otherAns.innerHTML = data.quote;
		username.innerHTML = "-" + data.username;

		quoteBoxMain.classList.add('fadeIn');

	}

	function hideQuoteMain(){
		quoteBoxMain.classList.remove('fadeIn');
		quoteBoxMain.classList.add('fadeOut');
	}

	quoteClose.addEventListener('mousedown', hideQuoteMain);

	return{
		showQuoteMain: showQuoteMain,
	}

})();