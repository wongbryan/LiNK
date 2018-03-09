const createController = function(renderer, scene, camera, mainAvatar, globe){

	const cameraPositions = {
		front: new THREE.Vector3(0, GLOBE_RADIUS + 7.5, GLOBE_RADIUS/3),
		side: new THREE.Vector3(-GLOBE_RADIUS/3, GLOBE_RADIUS + 7.5, 0),
		diagonal: new THREE.Vector3(-GLOBE_RADIUS/3, GLOBE_RADIUS + 7.5, GLOBE_RADIUS/3),
	}

	camera.currentPos = 'front';

	const clock = new THREE.Clock();
	clock.start();

	/* Post processing stuff */
	let postprocessing = false;

	const composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));

    const monochromePass = new THREE.ShaderPass( SHADERS.monochrome );
   	monochromePass.renderToScreen = true;
    composer.addPass( monochromePass );

    function fadeIntoColor(){

    	tweenScalar(monochromePass.uniforms['magnitude'], 'value', 0);

    }

    function expandStarField(){

    	let s = 1.5;
    	let t = new THREE.Vector3(s, s, s);

    	let tween = new TWEEN.Tween(globe.scale).to(t, 1000);
    	tween.easing(TWEEN.Easing.Exponential.Out);
    	tween.onUpdate( () => {

    		globe.material.uniforms['maxDist'].value += 10;
    		globe.material.uniforms['size'].value += .001;

    	});
    	tween.onComplete(()=>{

    		globe.material.uniforms['maxDist'].value = 10000;

    	});

    	tween.start();

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

	function update(){

		TWEEN.update();
	    var d = clock.getDelta();
	    let globalTime = clock.elapsedTime;

	    globe.frustumCulled = false;
	    globe.rotation.x += .0001;
	    controls.update();

	}

	function animate(){

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
		setMainLightIntensity: setMainLightIntensity,
		setWorldLights: setWorldLights,
		setAvatarOpacity: setAvatarOpacity,
		fadeIntoColor: fadeIntoColor,
		expandStarField: expandStarField,
		moveCamera: moveCamera,
		update: update,
		animate: animate,
	}

};