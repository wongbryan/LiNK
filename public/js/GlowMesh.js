var GlowMesh = function(geom, color){

	var mat = new THREE.ShaderMaterial({
        uniforms: {
            'glowColor': { value: color },
            'c': { value: 0 },
            'p': { value: 5 },
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.FrontSide
    });

    var mesh = new THREE.Mesh(geom, mat);

    this.__proto__ = mesh;
}