const UIController = (function(){

	var title = document.getElementById('title'),
	prompt = document.getElementById('prompt'),
	answer = document.getElementById('answer');

	var quoteBoxMain = document.getElementById('quoteBoxMain'),
	quoteAnswer = document.getElementById('quoteAnswer'),
	quoteClose = quoteBoxMain.getElementsByClassName('close')[0];

	function onAnswerSubmit(e){

		e.preventDefault();
		let ans = answer.value;
		
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

	prompt.addEventListener('submit', onAnswerSubmit);
	quoteClose.addEventListener('mousedown', hideQuoteMain);

	return{
		showQuoteMain: showQuoteMain
	}

})();