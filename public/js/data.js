const user_data = {
	name: "",
	id: 0,
	text: "",
	votes: 0,
	donation: 0,
	character: null,
};

const other_users_data = [];

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
	'lightgray2': new THREE.MeshStandardMaterial({
	    color: 0xf7faff,
	    emissive: 0xdbdcdd,
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
    darkbrown: new THREE.MeshStandardMaterial({
        color: 0xebfffb,
        emissive: 0x75472c,
        metalness: .5,
        flatShading: false,
        roughness: .06
    }),
    lightbrown: new THREE.MeshStandardMaterial({
        color: 0xebfffb,
        emissive: 0xa36636,
        metalness: .5,
        flatShading: false,
        roughness: .06
    }),
    beige: new THREE.MeshStandardMaterial({
        color: 0xebfffb,
        emissive: 0xf8da84,
        metalness: .5,
        flatShading: false,
        roughness: .06
    }),
};

/* Dynamic data */

let MODEL_DATA = {
    'bread': {
 		backing: {
 		},
 		bread: {
 		},
 		crust: {
 		}
    },
    'poop': {
 		top: {
 		},
 		ring1: {
 		},
 		ring2: {
 		},
 		ring3: {
 		},
 		ring4: {
 		},
    }
}

let FONT_DATA = {
    'fugue': null,
}

/* Static data */

let CHAR_DATA;

/* Assign after loading dependencies. Char data depends on loaded models. */

const initData = () => {

	function round(geom, n){
		var modifier = new THREE.SubdivisionModifier(n);
		modifier.modify(geom);
		return geom;
	}

	//offset calculated in relation to torso
	//use 'part' property so we don't recursively iterate through 
	//threejs objects
	CHAR_DATA = {

		robot: {
			upper: {
				offset: new THREE.Vector3(0, 4.75, 0),
				dom: {	
					name: 'head',
					dom: true, //if dom, use to calculate position of other parts
					geom: round(new THREE.BoxGeometry(5, 5, 5, 3, 3), 4),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eyeLeft: {	
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(.2, .1, .51)
				},
				antennae: {
					name: 'antennae',
					geom: new THREE.CylinderGeometry(.03, .05, 3),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(0, .45, 0),
				},
				bulb: {
					name: 'bulb',
					geom: new THREE.SphereGeometry(.25, 16, 16),
					mat: MAT_DATA['red'],
					offset: new THREE.Vector3(0, .75, 0)
				},
				mouth: {
					name: 'mouth',
					geom: round(new THREE.BoxGeometry(1, 2.5, .1, 3, 3), 4),
					mat: MAT_DATA['white'],
					offset: new THREE.Vector3(0, -.2, .515),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
				outline: {
					name: 'outline',
					geom: round(new THREE.BoxGeometry(1.075, 2.575, .1, 3, 3), 4),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(0, -.2, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso',
					geom: new THREE.CylinderGeometry(2.75, 3.7, 4, 4, 12),
					mat: MAT_DATA['lightblue'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				outline: {
					name: 'outline',
					geom: round(new THREE.BoxGeometry(1.35, 2.85, .1, 3, 3), 4),
					mat: MAT_DATA['red'],
					offset: new THREE.Vector3(-.125, 0, .33),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				pad1: {
					name: 'pad1',
					geom: round(new THREE.BoxGeometry(1.25, 2.75, .1, 3, 3), 4),
					mat: MAT_DATA['white'],
					offset: new THREE.Vector3(-.125, 0, .335),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				pad2: {
					name: 'pad2',
					geom: new THREE.CircleGeometry(.6, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(.125, -.17, .34),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				light1: {
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['red'],
					offset: new THREE.Vector3(.05, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				light2: {
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['green'],
					offset: new THREE.Vector3(.125, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				light3: {
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['yellow'],
					offset: new THREE.Vector3(.2, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				tag: {
					name: 'tag',
					part: true,
					geom: new THREE.PlaneGeometry(.3, 1.4),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(.125, .075, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, Math.PI/2),
				},
			},
			leftUpper: {
				offset: new THREE.Vector3(-3.5, 1.3, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			rightUpper: {
				offset: new THREE.Vector3(3.5, 1.3, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			leftLower: {
				offset: new THREE.Vector3(-2, -3.5, 0),
				dom: {
					dom: true,
					name: 'legLeft',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['gray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			},
			rightLower: {
				offset: new THREE.Vector3(2, -3.5, 0),
				dom: {
					dom: true,
					name: 'legRight',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['gray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			}
		},

		dice: {
			upper: {},
			upperLeft: {
				offset: new THREE.Vector3(-3, 0, 0),
				dom: {	
					name: 'head',
					dom: true, 
					geom: round(new THREE.BoxGeometry(3, 3, 3, 3, 3), 4),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eye1: {	
					name: 'eye1',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eye2: {
					name: 'eye2',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(.2, .1, .51)
				},
				mouth: {
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, Math.PI),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(0, -.1, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI),
				},
				letter1: {
					name: 'letter1',
					geom: getFontGeom('6', FONT_DATA['fugue'], 1.5),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			},
			upperRight: {
				offset: new THREE.Vector3(3, 0, 0),
				dom: {	
					name: 'head',
					dom: true, 
					geom: round(new THREE.BoxGeometry(3, 3, 3, 3, 3), 4),
					mat: MAT_DATA['green'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				line1: {	
					name: 'line1',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/4)
				},
				line2: {	
					name: 'line2',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4)
				},
				line3: {	
					name: 'line3',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/4)
				},
				line4: {	
					name: 'line4',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4)
				},
				mouth: {
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, -Math.PI),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(0, -.175, .51),
					rotation: new THREE.Vector3(0, Math.PI, Math.PI),
				},
				letter1: {
					name: 'letter1',
					geom: getFontGeom('9', FONT_DATA['fugue'], 1.5),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			},
			middle: {},
			lowerLeft: {},
			lowerRight: {},
		},

		astronaut: {
			upper: {
				offset: new THREE.Vector3(0, 5.5, 0),
				dom: {
					dom: true,
					name: 'helmet',
					// geom: round(new THREE.BoxGeometry(5.2, 5.2, 5.2, 3, 3), 4),
					geom: new THREE.SphereGeometry(3.5, 32, 32),
					mat: MAT_DATA['white'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					opacity: .5
				},
				head: {	
					name: 'head',
					// dom: true, //if dom, use to calculate position of other parts
					geom: round(new THREE.BoxGeometry(4.5, 4.5, 5.3, 3, 3), 4),
					// geom: new THREE.SphereGeometry(3, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eyeLeft: {	
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(-.2, .1, .4)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(.2, .1, .4)
				},
				pad1: {
					name: 'pad1',
					geom: round(new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(-.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
				pad2: {
					name: 'pad2',
					geom: round(new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
			},
			upperLeft: {
				offset: new THREE.Vector3(-3, 1, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			upperRight: {
				offset: new THREE.Vector3(3, 1, 0),
				dom: {
					dom: true,
					name: 'armRight',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso1',
					geom: round(new THREE.CylinderGeometry(1.75, 1.75, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'],
					offset: new THREE.Vector3(0, 2, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso2: {
					name: 'torso2',
					geom: round(new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'],
					offset: new THREE.Vector3(0, 1.25, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso3: {
					name: 'torso3',
					geom: round(new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'],
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso4: {
					name: 'torso4',
					geom: round(new THREE.CylinderGeometry(2.5, 2.5, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'],
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso5: {
					name: 'torso5',
					geom: new THREE.BoxGeometry(4.76, 1.75, 4, 3, 3),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(0, -1.3, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light1: {
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['lightblue'],
					offset: new THREE.Vector3(.15, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light2: {
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['green'],
					offset: new THREE.Vector3(.30, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light3: {
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(.45, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light4: {
					name: 'light4',
					geom: new THREE.PlaneGeometry(.9, .9),
					mat: MAT_DATA['black'],
					offset: new THREE.Vector3(-.4, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
			},
			lowerLeft: {
				offset: new THREE.Vector3(-2, -3.5, 0),
				dom: {
					dom: true,
					name: 'legLeft',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			},
			lowerRight: {
				offset: new THREE.Vector3(2, -3.5, 0),
				dom: {
					dom: true,
					name: 'legRight',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			},
		},

		breadGuy: {
			upper: {},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['bread'].backing.mesh,
					mat: MAT_DATA['beige'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eyeLeft: {	
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(-.5, 2, .55)
				},
				eyeRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(.5, 2, .55)
				},
			},
			upperLeft: {},
			upperRight: {},
			lowerLeft: {},
			lowerRight: {},

		},

		poopGuy: {
			upper: {
				offset: new THREE.Vector3(0, .5, 0),
				dom: {	
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CylinderGeometry(.2, .2, .1, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(-2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CylinderGeometry(.2, .2, .1, 32, 32),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
				browLeft: {	
					dom: true,
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.TorusGeometry(.25, .075, 16, 20, Math.PI),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(-1.5, -1, .4),
				},
				browRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.TorusGeometry(.25, .075, 16, 20, Math.PI),
					mat: MAT_DATA['orange'],
					offset: new THREE.Vector3(1.5, -1, .4)
				},
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['poop'].top.mesh,
					mat: MAT_DATA['lightbrown'],
					offset: new THREE.Vector3(0, -.25, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring1: {
					mesh: MODEL_DATA['poop'].ring1.mesh,
					mat: MAT_DATA['darkbrown'],
					offset: new THREE.Vector3(0, -.35, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring2: {
					mesh: MODEL_DATA['poop'].ring2.mesh,
					mat: MAT_DATA['lightbrown'],
					offset: new THREE.Vector3(0, -.55, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring3: {
					mesh: MODEL_DATA['poop'].ring3.mesh,
					mat: MAT_DATA['darkbrown'],
					offset: new THREE.Vector3(0, -.75, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring4: {
					mesh: MODEL_DATA['poop'].ring4.mesh,
					mat: MAT_DATA['darkbrown'],
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
			},
			// upperLeft: [],
			// upperRight: [],
			// lowerLeft: [],
			// lowerRight: [],

		},
	}

	//custom tweaks so I don't have to copy and paste data

	const numTeeth = 2;
	for(let i=0; i<numTeeth; i++){

		let length = 1;
		let height = 1;
		let o = length / numTeeth / 2;

		let t = {
			name: 'line' + i,
			geom: new THREE.BoxGeometry(.03, height-.05, .03),
			mat: MAT_DATA['black'],
			offset: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Vector3(0, 0, 0)
		};

		let pos = new THREE.Vector3( (i-numTeeth/2 + .5)*o, -.2, .53);
		console.log(pos);
		t.offset = pos;

		let n = 'line' + i;

		CHAR_DATA['robot'].upper[n] = t;
	}

}

const excludeColors = ['black', 'lightgray', 'gray', 'white', 'lightgray2', 'darkgray'];
const allColors = (Object.keys(MAT_DATA)).filter( k => (excludeColors.indexOf(k) === -1) );

const CHAR_DATA_OVERRIDES = {
	astronaut: {
		'upper_eyeLeft': ['black'],
		'upper_eyeRight': ['black'], 
		'upper_head': ['orange', 'yellow'],
	},
	poopGuy: {
		'upper_dom': ['lightblue'],
		'upper_eyeRight': ['lightblue'],
		'middle_dom': allColors,
		'middle_ring1': allColors,
		'middle_ring2': allColors,
		'middle_ring3': allColors,
		'middle_ring4': allColors
	},
	robot: {
		'upper_eyeLeft': ['black', 'lightgray'],
		'upper_eyeRight': ['black', 'lightgray'], 
		'upper_dom': ['orange', 'yellow']
	},
	dice: {
		'upperLeft_dom': ['orange', 'yellow'], 
		'upperRight_dom': ['lightblue', 'red'], 
	},
}