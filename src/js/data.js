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
	'yellow': new THREE.MeshStandardMaterial({
        color: 0x89918c,
        emissive: 0xf0d93d,
        roughness: .4,
        flatShading: false,
        metalness: .6
    }),
    'lightblue': new THREE.MeshStandardMaterial({
	    color: 0x89918c,
	    emissive: 0x2baff7,
	    roughness: .4,
	    flatShading: false,
	    metalness: .6
	}),
	'black': new THREE.MeshStandardMaterial({
	    color: 0xffffff,
	    emissive: 0x040709,
	    roughness: .0,
	    flatShading: false,
	    metalness: .24
	}), 
	'white': new THREE.MeshStandardMaterial({
	    color: 0x1e2023,
	    emissive: 0xf4f8ff,
	    roughness: .0,
	    flatShading: false,
	    metalness: .24,
	}),
	'blackline': new THREE.LineBasicMaterial({
		color: 0x000000,
	}),
	'redline': new THREE.LineBasicMaterial({
		color: 0xf7312a,
	}),
	'lightgray': new THREE.MeshStandardMaterial({
	    color: 0xf7faff,
	    emissive: 0xe8eaef,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	}),
	'red': new THREE.MeshStandardMaterial({
        color: 0xd9486b,
        emissive: 0xf7312a,
        roughness: .0,
        flatShading: false,
        metalness: .3
    }),
    green: new THREE.MeshStandardMaterial({
        color: 0xf7faff,
        emissive: 0x29d025,
        metalness: .5,
        flatShading: false,
        roughness: .06
    }),
    darkgray: new THREE.MeshStandardMaterial({
	    color: 0xf7faff,
	    emissive: 0x75777c,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	}),
	gray: new THREE.MeshStandardMaterial({
	    color: 0xf7faff,
	    emissive: 0x86888c,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	}),
    orange: new THREE.MeshStandardMaterial({
        color: 0xebfffb,
        emissive: 0xfda638,
        metalness: .5,
        flatShading: false,
        roughness: .06
    }),

}

function round(geom, n){
	var modifier = new THREE.SubdivisionModifier(n);
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
			geom: round(new THREE.BoxGeometry(5, 5, 5, 3, 3), 4),
			mat: MAT_DATA['orange'].clone(),
			offset: new THREE.Vector3(0, 1.25, 0),
			rotation: new THREE.Vector3(0, 0, 0),

			eyeLeft:{
				part: true,
				// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
				geom: new THREE.CircleGeometry(.2, 32, 32),
				mat: MAT_DATA['black'].clone(),
				offset: new THREE.Vector3(-.2, .1, .51)
			},

			eyeRight:{
				part: true,
				// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
				geom: new THREE.CircleGeometry(.2, 32, 32),
				mat: MAT_DATA['black'].clone(),
				offset: new THREE.Vector3(.2, .1, .51)
			},

			antennae:{
				part: true,
				geom: new THREE.CylinderGeometry(.03, .05, 3),
				mat: MAT_DATA['black'].clone(),
				offset: new THREE.Vector3(0, .45, 0),

				bulb: {
					part: true,
					geom: new THREE.SphereGeometry(.25, 16, 16),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(0, .5, 0)
				}
			},

			mouth: {
				part: true,
				geom: round(new THREE.BoxGeometry(1, 2.5, .1, 3, 3), 4),
				mat: MAT_DATA['white'].clone(),
				offset: new THREE.Vector3(0, -.2, .51),
				rotation: new THREE.Vector3(0, 0, Math.PI/2),

				line: {
					part: true,
					geom: new THREE.BoxGeometry(.03, 2.4, .03),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, 0, 1),
					rotation: new THREE.Vector3(0, 0, 0)
				},

				outline:{
					part: true,
					geom: round(new THREE.BoxGeometry(1.075, 2.575, .1, 3, 3), 4),
					mat: MAT_DATA['blackline'].clone(),
					offset: new THREE.Vector3(0, 0, -.1),
				}
			},
		},
		pad: {
			part: true,
			geom: round(new THREE.BoxGeometry(1.25, 2.75, .1, 3, 3), 4),
			mat: MAT_DATA['white'].clone(),
			offset: new THREE.Vector3(-.125, 0, .32),
			rotation: new THREE.Vector3(-Math.PI/16, 0, 0),

			outline: {
				part: true,
				geom: round(new THREE.BoxGeometry(1.28, 2.78, .1, 3, 3), 4),
				mat: MAT_DATA['redline'].clone(),
				offset: new THREE.Vector3(0, 0, -.02),
				rotation: new THREE.Vector3(0, 0, 0),
			}
		},
		pad2: {
			part: true,
			geom: new THREE.CircleGeometry(.6, 32, 32),
			mat: MAT_DATA['orange'].clone(),
			offset: new THREE.Vector3(.125, -.17, .34),
			rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
		},
		light1: {
			part: true,
			geom: new THREE.CircleGeometry(.2, 32, 32),
			mat: MAT_DATA['red'].clone(),
			offset: new THREE.Vector3(.05, .2, .31),
			rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
		},
		light2: {
			part: true,
			geom: new THREE.CircleGeometry(.2, 32, 32),
			mat: MAT_DATA['green'].clone(),
			offset: new THREE.Vector3(.125, .2, .31),
			rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
		},
		light3: {
			part: true,
			geom: new THREE.CircleGeometry(.2, 32, 32),
			mat: MAT_DATA['yellow'].clone(),
			offset: new THREE.Vector3(.2, .2, .31),
			rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
		},
		tag:{
			part: true,
			geom: new THREE.PlaneGeometry(.3, 1.4),
			mat: MAT_DATA['darkgray'].clone(),
			offset: new THREE.Vector3(.125, .075, .31),
			rotation: new THREE.Vector3(-Math.PI/16, 0, Math.PI/2),
		},
		torso: {
			part: true,
			geom: new THREE.CylinderGeometry(2.75, 3.7, 4, 4, 12),
			mat: MAT_DATA['lightblue'],
			offset: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Vector3(0, Math.PI/4, 0),
		},
		armLeft: {
			part: true,
			geom: new THREE.SphereGeometry(.5, 32, 32),
			// geom: new THREE.BoxGeometry(1, 2, 1),
			mat: MAT_DATA['lightgray'],
			offset: new THREE.Vector3(-.45, .15, 0),
			rotation: new THREE.Vector3(0, 0, -Math.PI/12)
		},
		armRight: {
			part: true,
			geom: new THREE.SphereGeometry(.5, 32, 32),
			// geom: new THREE.BoxGeometry(1, 2, 1),
			mat: MAT_DATA['lightgray'],
			offset: new THREE.Vector3(.45, .15, 0),
			rotation: new THREE.Vector3(0, 0, Math.PI/12)
		},
		legLeft: {
			part: true,
			geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
			mat: MAT_DATA['gray'],
			offset: new THREE.Vector3(-.3, -.75, 0),
			rotation: new THREE.Vector3(0, 0, Math.PI/2)
		},
		legRight: {
			part: true,
			geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
			mat: MAT_DATA['gray'],
			offset: new THREE.Vector3(.3, -.75, 0),
			rotation: new THREE.Vector3(0, 0, -Math.PI/2)
		}
	}
}

//custom tweaks so I don't have to copy and paste data

const numTeeth = 4;
for(let i=0; i<numTeeth; i++){

	let length = 2;
	let height = 1;
	let o = length / numTeeth / 2;

	let t = {
		part: true,
		geom: new THREE.BoxGeometry(.03, height-.05, .03),
		mat: MAT_DATA['black'].clone(),
		offset: new THREE.Vector3(0, 0, 1),
		rotation: new THREE.Vector3(0, 0, Math.PI/2)
	};

	let pos = new THREE.Vector3( 0, (i-numTeeth/2 + .5)*o, 1);
	console.log(pos);
	t.offset = pos;

	let key = 'tooth' + i;
	ROBOT_DATA.lbp.head.mouth[key] = t;
}

