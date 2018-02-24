const RIG_DATA = {
	'test-anim': null,
}

const MODEL_DATA = {
	'latin2': {
		'poncho': {
			mesh: null,
		},
		'mustache_latin':{
			mesh: null,
		},
		'hat_latin': {
			mesh: null
		}
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