const createController = function(renderer, scene, camera, mainAvatar, globe){

	const cameraPositions = {
		front: new THREE.Vector3(0, GLOBE_RADIUS + 7.5, GLOBE_RADIUS/3),
		side: new THREE.Vector3(-(GLOBE_RADIUS/3 + 75), GLOBE_RADIUS + 35, 75),
		diagonal: new THREE.Vector3(-GLOBE_RADIUS/3, GLOBE_RADIUS + 7.5, GLOBE_RADIUS/3),
	}

	camera.currentPos = 'front';

	const clock = new THREE.Clock();
	clock.start();

	/* Post processing stuff */

	const composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));

    const monochromePass = new THREE.ShaderPass( SHADERS.monochrome );
    composer.addPass( monochromePass );

    const shaderPasses = {

    	'monochrome': monochromePass,

    }

    turnOnPostProcessing('monochrome');

    function turnOnPostProcessing(name){

    	let pass = shaderPasses[name];
    	pass.renderToScreen = true;
    	postprocessing = pass;

    }

    function turnOffPostProcessing(passName){

    	if(passName){

    		let pass = shaderPasses[passName];
    		pass.renderToScreen = false;

    	}
    	else if(postprocessing){

    		postprocessing.renderToScreen = false;
    		postprocessing = null;

    	}

    }

    function fadeToColor(delay){

    	setTimeout(function(){
    		tweenScalar(monochromePass.uniforms['darkness'], 'value', 0, 500, TWEEN.Easing.Quadratic.InOut, turnOffPostProcessing);
    		tweenScalar(monochromePass.uniforms['magnitude'], 'value', 0);
    	}, delay);

    }

    function sizeStarField(s, delay, targetDist, targetSize, distTime){

    	setTimeout(function(){

	    	let t = new THREE.Vector3(s, s, s);

	    	let tween = new TWEEN.Tween(globe.scale).to(t, 1000);
	    	tween.easing(TWEEN.Easing.Exponential.Out);

	    	let easing = TWEEN.Easing.Quadratic.InOut;
	    	// globe.material.uniforms['maxDist'].value = targetDist;
	    	let tw = tweenScalar(globe.material.uniforms['maxDist'], 'value', targetDist, distTime, easing);
	    	// tw.onUpdate(function(){
	    	// 	console.log(globe.material.uniforms['maxDist'].value);
	    	// })
	    	tweenScalar(globe.material.uniforms['size'], 'value', targetSize);

	    	tween.start();
    	}, delay);

    }

    function expandStarField(delay){

    	sizeStarField(1.5, delay, 500, .2, 600);

    }

    function shrinkStarField(delay){

    	sizeStarField(1, delay, 100, .2, 300);

    }

	function setMainLightIntensity(n){

		tweenScalar(mainAvatar.light, 'intensity', n);

	}

	function setWorldLights(appearAmt){

		globe.material.uniforms['appearAmt'].value = appearAmt;

	}

	function setAvatarOpacity(n){

		mainAvatar.traverse( (c) => {

			if(c.hasOwnProperty('material')){

				tweenScalar(c.material, 'opacity', n);

			}

		} );

	}

	function moveCamera(pos){

		let p = cameraPositions[pos];
		let t = new TWEEN.Tween(camera.position).to(p, 800);
		t.easing(TWEEN.Easing.Quadratic.InOut);
		t.start();

		camera.currentPos = pos;

	}

	let rot = {
		val: 0,
	}
	let stopped = false;

	function update(){

	    TWEEN.update();
	    const d = clock.getDelta();
	    const globalTime = clock.elapsedTime;

	    globe.frustumCulled = false;
	    globe.rotation.x += .0001;
	    controls.update();

	    if(rot.val){

	    	innerGlobe.rotation.x += rot.val;
		    let angle = 2 * Math.PI / (checkpoints.length) * checkpointIndex; 
		    console.log(angle);

		    if( (innerGlobe.rotation.x <= (-angle + Math.PI/25)) && !stopped){ //stop rotation

		    	UIController.showQuoteMain(dummy_data);
		    	paused = true;

		    }

	    }

	}

	function executeAction(index){

		checkpointActions[index]();

	}

	function setRotationFactor(val, callback){

		tweenScalar(rot, 'val', val, 500, TWEEN.Easing.Quadratic.InOut, callback);

	}

	function stopRotation(){

		const callback =  function(){

			console.log('rotation stopped');
			UIController.showQuoteMain(dummy_data);

    	};

    	setRotationFactor(0, callback);

	}

	function continueRotation(){

		const callback = function(){

			console.log('rotation continued');

			if(stopped){ //if it was stopped after being started

				checkpointIndex++;

			}
		
			stopped = false;

    	}

		setRotationFactor(-.002, callback);
	}

	function animate(){
	    TWEEN.update()
	    window.requestAnimationFrame(animate)
	    update();

	    //Animation should be extracted into its own function
	    //but you get the point for now.

	    if(postprocessing){


	    	composer.render();

	    } else{

	    	renderer.render(scene, camera);

	    }
	}

	return {
		turnOnPostProcessing: turnOnPostProcessing,
		turnOffPostProcessing: turnOffPostProcessing,
		setMainLightIntensity: setMainLightIntensity,
		setWorldLights: setWorldLights,
		setAvatarOpacity: setAvatarOpacity,
		fadeToColor: fadeToColor,
		expandStarField: expandStarField,
		shrinkStarField: shrinkStarField,
		sizeStarField: sizeStarField,
		moveCamera: moveCamera,
		continueRotation: continueRotation,
		stopRotation: stopRotation,
		setRotationFactor: setRotationFactor,
		executeAction: executeAction,
		update: update,
		animate: animate,
	}

};
