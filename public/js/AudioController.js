const CreateAudioController = function(){

	const nightAudio = document.createElement('audio');
	const dayAudio = document.createElement('audio');

	nightAudio.src = "/assets/sounds/bg_night.mp3";
	dayAudio.src = "/assets/sounds/bg_day.mp3";

	function stop(audio){

		pause(audio);
		audio.currentTime = 0;

	}

	function pause(audio){

		audio.pause();

	}

	function play(audio){

		audio.play();

	}

	function fade(audio, dir){

		const initialVal = (dir === 1) ? 0 : 1;
		const targetVal = (dir === 1) ? 1 : 0;

		audio.volume = initialVal;
		audio.play();

		let cur = {
			value: initialVal,
		};

		let target = {
			value: targetVal,
		};

		let t = new TWEEN.Tween(cur).to(target, 800);
		t.easing(TWEEN.Easing.Quadratic.In);
		t.onUpdate(function(){
			audio.volume = cur.value;
		});
		t.start();

	}

	function playNight(){

		fade(nightAudio, 1);

	}

	function stopNight(){

		fade(nightAudio, 0);

	}

	function playDay(){

		fade(dayAudio, 1);

	}

	function stopDay(){

		fade(dayAudio, 0);

	}

	function setVolumeNight(level){

		setVolume(nightAudio, level);

	}

	function setVolume(audio, level){

		let cur = {
			value: audio.volume,
		};

		let target = {
			value: level,
		};

		let t = new TWEEN.Tween(cur).to(target, 800);
		t.easing(TWEEN.Easing.Quadratic.In);
		t.onUpdate(function(){
			audio.volume = cur.value;
		});
		t.start();

	}

	return {

		playNight: playNight,
		stopNight: stopNight,
		playDay: playDay,
		stopDay: stopDay,
		setVolumeNight: setVolumeNight,

	}

}