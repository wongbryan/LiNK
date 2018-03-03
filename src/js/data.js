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
const CHAR_DATA = {
	robot: {
		upper: [
			{
				name: 'position',
				offset: new THREE.Vector3(0, 1, 0),
			},
			{	
				name: 'head',
				dom: true, //if dom, use to calculate position of other parts
				geom: round(new THREE.BoxGeometry(5, 5, 5, 3, 3), 4),
				mat: MAT_DATA['orange'].clone(),
				offset: new THREE.Vector3(0, 0, 0),
				rotation: new THREE.Vector3(0, 0, 0),
			},
			{	
				name: 'eyeLeft',
				// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
				geom: new THREE.CircleGeometry(.2, 32, 32),
				mat: MAT_DATA['black'].clone(),
				offset: new THREE.Vector3(-.2, .1, .51)
			},
			{
				name: 'eyeRight',
				// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
				geom: new THREE.CircleGeometry(.2, 32, 32),
				mat: MAT_DATA['black'].clone(),
				offset: new THREE.Vector3(-.2, .1, .51)
			},
		],
		middle: {


		},
		leftUpper: {

		},
		rightUpper: {

		},
		leftLower: {

		},
		rightLower: {

		}
	}
}

//custom tweaks so I don't have to copy and paste data

// const numTeeth = 4;
// for(let i=0; i<numTeeth; i++){

// 	let length = 2;
// 	let height = 1;
// 	let o = length / numTeeth / 2;

// 	let t = {
// 		part: true,
// 		geom: new THREE.BoxGeometry(.03, height-.05, .03),
// 		mat: MAT_DATA['black'].clone(),
// 		offset: new THREE.Vector3(0, 0, 1),
// 		rotation: new THREE.Vector3(0, 0, Math.PI/2)
// 	};

// 	let pos = new THREE.Vector3( 0, (i-numTeeth/2 + .5)*o, 1);
// 	console.log(pos);
// 	t.offset = pos;

// 	let key = 'tooth' + i;
// 	ROBOT_DATA.lbp.head.mouth[key] = t;
// }

