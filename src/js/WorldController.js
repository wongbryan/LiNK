const WORLD_CONTROLLER = (function(){

	function setMainLightIntensity(n){

		testMesh.light.intensity = n;

	}

	function adjustWorldLights(appearAmt){

		globe.material.uniforms['appearAmt'].value = appearAmt;

	}

	return {
		setMainLightIntensity: setMainLightIntensity,
		adjustWorldLights: adjustWorldLights,
	}

})();