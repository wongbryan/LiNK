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

	function onAnswerSubmit(e){

		if(e)
			e.preventDefault();

		let ans = answer.value;
		console.log(ans);

		title.classList.add('fadeOut');

		return false;
	}

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
	quoteClose.addEventListener('mousedown', hideQuoteMain);
	answer.addEventListener('keydown', ansKeyDown);
	answer.addEventListener('blur', keepBlur);

	return{
		showQuoteMain: showQuoteMain,
	}

})();