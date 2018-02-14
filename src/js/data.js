const RIG_DATA = {
	'test-anim': null,
}

const MODEL_DATA = {
	'star': {
		mesh: null,
		materials: ['star', 'halo']
	}
}

const MAT_DATA = {
	'star': new THREE.MeshStandardMaterial({
        color: 0x89918c,
        emissive: 0xf0d93d,
        roughness: .4,
        flatShading: false,
        metalness: .6
    }),
    'halo': new THREE.MeshStandardMaterial({
	    color: 0x89918c,
	    emissive: 0x2baff7,
	    roughness: .4,
	    flatShading: false,
	    metalness: .6
	}),
}