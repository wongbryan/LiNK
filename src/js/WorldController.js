const WORLD_CONTROLLER = (function(){

	function setMainLightIntensity(n){

		tweenScalar(testMesh.light, 'intensity', n);

	}

	function seWorldLights(appearAmt){

		globe.material.uniforms['appearAmt'].value = appearAmt;

	}

	function setAvatarOpacity(n){

		testMesh.traverse( (c) => {

			if(c.hasOwnProperty('material')){

				tweenScalar(c.material, 'opacity', n);

			}

		} );

	}

	return {
		setMainLightIntensity: setMainLightIntensity,
		seWorldLights: seWorldLights,
		setAvatarOpacity: setAvatarOpacity,
	}

})();