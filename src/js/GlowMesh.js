var GlowMesh = function(geom, color){

	var mat = new THREE.ShaderMaterial({
        uniforms: {
            'viewVector': { value: camera2.position },
            'glowColor': { value: color },
            'c': { value: 0 },
            'p': { value: 5 },
            'time': { value: Math.random() * 360. },
            'level': { value: Math.random() * 1 + 1}
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