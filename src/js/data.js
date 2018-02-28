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

function getRoundedBox(geom){
	var modifier = new THREE.SubdivisionModifier(4);
	modifier.modify(geom);
	return geom;
}

//offset calculated in relation to torso
//use 'part' property so we don't recursively iterate through 
//threejs objects
const ROBOT_DATA = {
	lbp: {
		head:{
			part: true,
			geom: getRoundedBox(new THREE.BoxGeometry(5, 5, 5, 3, 3)),
			offset: new THREE.Vector3(0, 1, 0),

			eyeLeft:{
				part: true,
				geom: new THREE.CircleGeometry(1),
				offset: new THREE.Vector3()
			}

		},
		torso: {
			part: true,
			geom: new THREE.SphereGeometry(1.5, 32, 32),
			offset: new THREE.Vector3(0, 0, 0)
		},
		armLeft: {
			part: true,
			geom: new THREE.BoxGeometry(1, 1, 1),
			offset: new THREE.Vector3(-.75, 0, 0)
		},
		armRight: {
			part: true,
			geom: new THREE.BoxGeometry(1, 1, 1),
			offset: new THREE.Vector3(.75, 0, 0)
		},
		legLeft: {
			part: true,
			geom: new THREE.BoxGeometry(2, 2, 2),
			offset: new THREE.Vector3(-1, -1, 0)
		},
		legRight: {
			part: true,
			geom: new THREE.BoxGeometry(2, 2, 2),
			offset: new THREE.Vector3(1, -1, 0)
		}
	}
}