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
	let hit = false;

	function update(){

	    TWEEN.update();
	    const d = clock.getDelta();
	    const globalTime = clock.elapsedTime;

	    globe.frustumCulled = false;
	    globe.rotation.x += .0001;
	    controls.update();

	    if(rot.val && !paused){

	    	innerGlobe.rotation.x += rot.val;
		    let angle = 2 * Math.PI / (checkpoints.length) * checkpointIndex; 
		    console.log(angle);

		    if( (innerGlobe.rotation.x <= (-angle + Math.PI/12)) && !hit){ //stop rotation and only set tween once

		    	hit = true;

		    	setRotationFactor(0, function(){
		    		hit = false;
		    		paused = true;
		    		const data = entries[checkpointIndex-1];
		    		AudioController.setVolumeNight(.5);
		    		UIController.showQuoteMain(data);
		    	});

		    }

	    }

	}

	function executeAction(index){

		checkpointActions[index]();

	}

	function setRotationFactor(val, callback){

		tweenScalar(rot, 'val', val, 1000, TWEEN.Easing.Quadratic.InOut, callback);

	}

	function resetGlobe(){

		tweenScalar(innerGlobe.rotation, 'x', 0, 3500, TWEEN.Easing.Quadratic.InOut);

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
		resetGlobe: resetGlobe,
		setRotationFactor: setRotationFactor,
		executeAction: executeAction,
		update: update,
		animate: animate,
	}

};
