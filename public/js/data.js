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
	'yellow': {
        color: 0x89918c,
        emissive: 0xf0d93d,
        roughness: .4,
        flatShading: false,
        metalness: .6
    },
    'lightblue': {
	    color: 0x89918c,
	    emissive: 0x2baff7,
	    roughness: .4,
	    flatShading: false,
	    metalness: .6
	},
	'black': {
	    color: 0xffffff,
	    emissive: 0x040709,
	    roughness: .0,
	    flatShading: false,
	    metalness: .24
	},
	'white': {
	    color: 0x1e2023,
	    emissive: 0xf4f8ff,
	    roughness: .0,
	    flatShading: false,
	    metalness: .24,
	},
	'blackline':{
		color: 0x000000,
	},
	'redline': {
		color: 0xf7312a,
	},
	'lightgray': {
	    color: 0xf7faff,
	    emissive: 0xe8eaef,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	},
	'lightgray2': {
	    color: 0xf7faff,
	    emissive: 0xdbdcdd,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	},
	'red': {
        color: 0xd9486b,
        emissive: 0xf7312a,
        roughness: .0,
        flatShading: false,
        metalness: .3
    },
    green: {
        color: 0xf7faff,
        emissive: 0x29d025,
        metalness: .5,
        flatShading: false,
        roughness: .06
    },
    darkgray: {
	    color: 0xf7faff,
	    emissive: 0x75777c,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	},
	gray: {
	    color: 0xf7faff,
	    emissive: 0x86888c,
	    roughness: .0,
	    flatShading: false,
	    metalness: .75,
	},
    orange: {
        color: 0xebfffb,
        emissive: 0xfda638,
        metalness: .5,
        flatShading: false,
        roughness: .06
    },
    darkbrown: {
        color: 0xebfffb,
        emissive: 0x75472c,
        metalness: .5,
        flatShading: false,
        roughness: .06
    },
    lightbrown: {
        color: 0xebfffb,
        emissive: 0xa36636,
        metalness: .5,
        flatShading: false,
        roughness: .06
    },
    beige: {
        color: 0xebfffb,
        emissive: 0xf8da84,
        metalness: .5,
        flatShading: false,
        roughness: .06
    },
    lightbeige: {
        color: 0xebfffb,
        emissive: 0xf9efb4,
        metalness: .5,
        flatShading: false,
        roughness: .06
    },
};

/* Dynamic data */

let MODEL_DATA = {
    'bread': {

    },
    'egg': {

    },
    'poop': {

    },
    'house': {

    },
    'ricecooker': {

    }
}

let FONT_DATA = {
    'fugue': null,
}

/* Static data */

let CHAR_DATA;

/* Assign after loading dependencies. Char data depends on loaded models. */

const initData = () => {

	//offset calculated in relation to torso
	//use 'part' property so we don't recursively iterate through 
	//threejs objects
	CHAR_DATA = {

		robot: {
			offset: new THREE.Vector3(0, 5, 0),
			upper: {
				offset: new THREE.Vector3(0, 4.75, 0),
				dom: {	
					name: 'head',
					dom: true, //if dom, use to calculate position of other parts
					round: 4,
					geom: new THREE.BoxGeometry(5, 5, 5, 3, 3),
					mat: 'orange',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eyeLeft: {	
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(.2, .1, .51)
				},
				antennae: {
					name: 'antennae',
					geom: new THREE.CylinderGeometry(.03, .05, 3),
					mat: 'black',
					offset: new THREE.Vector3(0, .45, 0),
				},
				bulb: {
					name: 'bulb',
					geom: new THREE.SphereGeometry(.25, 16, 16),
					mat: 'red',
					offset: new THREE.Vector3(0, .75, 0)
				},
				mouth: {
					name: 'mouth',
					round: 4,
					geom: new THREE.BoxGeometry(1, 2.5, .1, 3, 3),
					mat: 'white',
					offset: new THREE.Vector3(0, -.2, .515),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
				outline: {
					name: 'outline',
					round: 4,
					geom: new THREE.BoxGeometry(1.075, 2.575, .1, 3, 3),
					mat: 'black',
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
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				outline: {
					name: 'outline',
					round: 4,
					geom: new THREE.BoxGeometry(1.35, 2.85, .1, 3, 3),
					mat: 'red',
					offset: new THREE.Vector3(-.125, 0, .33),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				pad1: {
					name: 'pad1',
					round: 4,
					geom: new THREE.BoxGeometry(1.25, 2.75, .1, 3, 3),
					mat: 'white',
					offset: new THREE.Vector3(-.125, 0, .335),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				pad2: {
					name: 'pad2',
					geom: new THREE.CircleGeometry(.6, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(.125, -.17, .34),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				light1: {
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'red',
					offset: new THREE.Vector3(.05, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				light2: {
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'green',
					offset: new THREE.Vector3(.125, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				light3: {
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'yellow',
					offset: new THREE.Vector3(.2, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				tag: {
					name: 'tag',
					part: true,
					geom: new THREE.PlaneGeometry(.3, 1.4),
					mat: 'darkgray',
					offset: new THREE.Vector3(.125, .075, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, Math.PI/2),
				},
			},
			upperLeft: {
				offset: new THREE.Vector3(-1.5, 1.3, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: 'lightgray',
					offset: new THREE.Vector3(-2, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			upperRight: {
				offset: new THREE.Vector3(1.5, 1.3, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: 'lightgray',
					offset: new THREE.Vector3(2, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			lowerLeft: {
				offset: new THREE.Vector3(-2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legLeft',
					part: true,
					round: 4,
					geom: new THREE.BoxGeometry(1, 2, 1, 3, 3),
					mat: 'gray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			},
			lowerRight: {
				offset: new THREE.Vector3(2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legRight',
					part: true,
					round: 4,
					geom: new THREE.BoxGeometry(1, 2, 1, 3, 3),
					mat: 'gray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			}
		},

		dice: {
			offset: new THREE.Vector3(0, 5, 0),
			upper: {},
			upperLeft: {
				offset: new THREE.Vector3(-3, 0, 0),
				dom: {	
					name: 'head',
					dom: true, 
					round: 4,
					geom: new THREE.BoxGeometry(3, 3, 3, 3, 3),
					mat: 'orange',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eye1: {	
					name: 'eye1',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eye2: {
					name: 'eye2',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(.2, .1, .51)
				},
				mouth: {
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, Math.PI),
					mat: 'black',
					offset: new THREE.Vector3(0, -.1, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI),
				},
				letter1: {
					name: 'letter1',
					geom: getFontGeom('6', FONT_DATA['fugue'], 1.5),
					mat: 'black',
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			},
			upperRight: {
				offset: new THREE.Vector3(3, 0, 0),
				dom: {	
					name: 'head',
					dom: true, 
					round: 4,
					geom: new THREE.BoxGeometry(3, 3, 3, 3, 3),
					mat: 'green',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				line1: {	
					name: 'line1',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: 'black',
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/4)
				},
				line2: {	
					name: 'line2',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: 'black',
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4)
				},
				line3: {	
					name: 'line3',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: 'black',
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/4)
				},
				line4: {	
					name: 'line4',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: 'black',
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4)
				},
				mouth: {
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, -Math.PI),
					mat: 'black',
					offset: new THREE.Vector3(0, -.175, .51),
					rotation: new THREE.Vector3(0, Math.PI, Math.PI),
				},
				letter1: {
					name: 'letter1',
					geom: getFontGeom('9', FONT_DATA['fugue'], 1.5),
					mat: 'black',
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			},
			middle: {},
			lowerLeft: {},
			lowerRight: {},
		},

		astronaut: {
			offset: new THREE.Vector3(0, 5, 0),
			upper: {
				offset: new THREE.Vector3(0, 5.5, 0),
				dom: {
					dom: true,
					name: 'helmet',
					round: 4,
					// geom: new THREE.BoxGeometry(5.2, 5.2, 5.2, 3, 3),
					geom: new THREE.SphereGeometry(3.5, 32, 32),
					mat: 'white',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					opacity: .5
				},
				head: {	
					name: 'head',
					// dom: true, //if dom, use to calculate position of other parts
					round: 4,
					geom: new THREE.BoxGeometry(4.5, 4.5, 5.3, 3, 3),
					// geom: new THREE.SphereGeometry(3, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				eyeLeft: {	
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(-.2, .1, .4)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(.2, .1, .4)
				},
				pad1: {
					name: 'pad1',
					round: 4,
					geom: new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1),
					mat: 'lightgray',
					offset: new THREE.Vector3(-.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
				pad2: {
					name: 'pad2',
					round: 4,
					geom: new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1),
					mat: 'lightgray',
					offset: new THREE.Vector3(.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
			},
			upperLeft: {
				offset: new THREE.Vector3(-1.5, 1, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: 'darkgray',
					offset: new THREE.Vector3(-1.5, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			upperRight: {
				offset: new THREE.Vector3(1.5, 1, 0),
				dom: {
					dom: true,
					name: 'armRight',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: 'darkgray',
					offset: new THREE.Vector3(1.5, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso1',
					round: 4,
					geom: new THREE.CylinderGeometry(1.75, 1.75, .8, 32, 1),
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, 2, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso2: {
					name: 'torso2',
					round: 4,
					geom: new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1),
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, 1.25, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso3: {
					name: 'torso3',
					round: 4,
					geom: new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1),
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso4: {
					name: 'torso4',
					round: 4,
					geom: new THREE.CylinderGeometry(2.5, 2.5, .8, 32, 1),
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				torso5: {
					name: 'torso5',
					geom: new THREE.BoxGeometry(4.76, 1.75, 4, 3, 3),
					mat: 'lightgray',
					offset: new THREE.Vector3(0, -1.3, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light1: {
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'lightblue',
					offset: new THREE.Vector3(.15, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light2: {
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'green',
					offset: new THREE.Vector3(.30, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light3: {
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(.45, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				light4: {
					name: 'light4',
					geom: new THREE.PlaneGeometry(.9, .9),
					mat: 'black',
					offset: new THREE.Vector3(-.4, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
			},
			lowerLeft: {
				offset: new THREE.Vector3(-2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legLeft',
					part: true,
					round: 4,
					geom: new THREE.BoxGeometry(1, 2, 1, 3, 3),
					mat: 'darkgray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			},
			lowerRight: {
				offset: new THREE.Vector3(2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legRight',
					part: true,
					round: 4,
					geom: new THREE.BoxGeometry(1, 2, 1, 3, 3),
					mat: 'darkgray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			},
		},

		breadGuy: {
			scale: 2.5,
			upper: {},
			middle: {
				offset: new THREE.Vector3(0, 2, 0),
				dom: {
					mesh: MODEL_DATA['bread'].bread.mesh,
					mat: 'lightbeige',
					offset: new THREE.Vector3(0, -.5, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					scale: 2.
				},
				crust: {
					mesh: MODEL_DATA['bread'].crust.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, -.45, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					scale: 1.98
				},
				// backing: {
				// 	mesh: MODEL_DATA['bread'].backing.mesh,
				// 	mat: 'lightbrown',
				// 	offset: new THREE.Vector3(0, 0, 0),
				// 	rotation: new THREE.Vector3(0, 0, 0),

				// },
				eggWhite: {
					mesh: MODEL_DATA['egg']['egg white'].mesh,
					mat: 'white',
					offset: new THREE.Vector3(0, 1., 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
				eggYolk: {
					mesh: MODEL_DATA['egg'].yolk.mesh,
					mat: 'yellow',
					offset: new THREE.Vector3(0, 1.2, 0),
					rotation: new THREE.Vector3(0, -Math.PI/2, 0),
				},
				eyeLeft: {	
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(-.5, 2, .55)
				},
				eyeRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(.5, 2, .55)
				},
			},
			upperLeft: {},
			upperRight: {},
			lowerLeft: {},
			lowerRight: {},

		},

		poopGuy: {
			scale: 3.,
			offset: new THREE.Vector3(0, 10., 0),
			upper: {
				offset: new THREE.Vector3(0, .5, 0),
				dom: {	
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CylinderGeometry(.2, .2, .1, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(-2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CylinderGeometry(.2, .2, .1, 32, 32),
					mat: 'orange',
					offset: new THREE.Vector3(2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
				browLeft: {	
					dom: true,
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.TorusGeometry(.25, .075, 16, 20, Math.PI),
					mat: 'orange',
					offset: new THREE.Vector3(-1.5, -1, .4),
				},
				browRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.TorusGeometry(.25, .075, 16, 20, Math.PI),
					mat: 'orange',
					offset: new THREE.Vector3(1.5, -1, .4)
				},
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['poop'].top.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, -.25, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring1: {
					mesh: MODEL_DATA['poop'].ring1.mesh,
					mat: 'darkbrown',
					offset: new THREE.Vector3(0, -.35, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring2: {
					mesh: MODEL_DATA['poop'].ring2.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, -.55, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring3: {
					mesh: MODEL_DATA['poop'].ring3.mesh,
					mat: 'darkbrown',
					offset: new THREE.Vector3(0, -.75, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
				ring4: {
					mesh: MODEL_DATA['poop'].ring4.mesh,
					mat: 'darkbrown',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0)
				},
			},
			// upperLeft: [],
			// upperRight: [],
			// lowerLeft: [],
			// lowerRight: [],
		},

		houseGuy: {
			scale: 2.,
			offset: new THREE.Vector3(0, 0, 0),
			top: {
				offset: new THREE.Vector3(0, 2.3, 0),
				dom: {
					mesh: MODEL_DATA['house'].roof.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0)
				},
			},
			middle: {
				offset: new THREE.Vector3(0, 2.5, 0),
				dom: {
					mesh: MODEL_DATA['house'].base.mesh,
					mat: 'beige',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0)
				},
				eyeLeft: {	
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.15, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(-.4, .8, .55)
				},
				eyeRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.15, 32, 32),
					mat: 'black',
					offset: new THREE.Vector3(.4, .8, .55)
				},
			},
			upperLeft: {
				offset: new THREE.Vector3(-1.5, 2, 0),
				dom: {
					mesh: MODEL_DATA['house'].leftArm.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI/2, -Math.PI/2, 0)
				},
			},
			upperRight: {
				offset: new THREE.Vector3(1.5, 2, 0),
				dom: {
					mesh: MODEL_DATA['house'].rightArm.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(Math.PI/2, Math.PI/2, 0)
				},
			},
			lowerLeft:{
				offset: new THREE.Vector3(-.65, .75, .5),
				dom: {
					mesh: MODEL_DATA['house'].leftLeg.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, Math.PI/2)
				},
			},
			lowerRight:{
				offset: new THREE.Vector3(.65, .75, .5),
				dom: {
					mesh: MODEL_DATA['house'].rightLeg.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, -Math.PI/2)
				},
			}
		},

		ricecookerGuy: {
			offset: new THREE.Vector3(0, 2, 0),
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom:{
					mesh: MODEL_DATA['ricecooker'].base.mesh,
					mat: 'lightgray',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, Math.PI),
				},
				bottom:{
					mesh: MODEL_DATA['ricecooker'].bottom.mesh,
					mat: 'darkgray',
					offset: new THREE.Vector3(0, -.03, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
				bottomofcover:{
					mesh: MODEL_DATA['ricecooker'].bottomofcover.mesh,
					mat: 'darkgray',
					offset: new THREE.Vector3(0, .05, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
					scale: 1.025
				},
				line1: {	
					name: 'line1',
					geom: new THREE.BoxGeometry(.1, .5, .08),
					mat: 'black',
					offset: new THREE.Vector3(-.23, .65, .57),
					rotation: new THREE.Vector3(0, 0, Math.PI/4),
					scale: .5
				},
				line2: {	
					name: 'line2',
					geom: new THREE.BoxGeometry(.1, .5, .08),
					mat: 'black',
					offset: new THREE.Vector3(-.3, .65, .57),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4),
					scale: .5
				},
				line3: {	
					name: 'line3',
					geom: new THREE.BoxGeometry(.1, .5, .08),
					mat: 'black',
					offset: new THREE.Vector3(.3, .65, .57),
					rotation: new THREE.Vector3(0, 0, Math.PI/4),
					scale: .5,
				},
				line4: {	
					name: 'line4',
					geom: new THREE.BoxGeometry(.1, .5, .08),
					mat: 'black',
					offset: new THREE.Vector3(.23, .65, .57),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4),
					scale: .5
				},
			},
			upper: {
				offset: new THREE.Vector3(0, .15, 0),
				dom: {
					mesh: MODEL_DATA['ricecooker'].cover.mesh,
					mat: 'lightgray',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
				handle: {
					mesh: MODEL_DATA['ricecooker'].handle.mesh,
					mat: 'lightgray',
					offset: new THREE.Vector3(0, 1.075, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			},
			lowerLeft: {
				offset: new THREE.Vector3(0, 1.05, 2),
				dom: {
					mesh: MODEL_DATA['ricecooker'].buttonbase.mesh,
					mat: 'darkgray',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(Math.PI/2, 0, Math.PI),
					scale: .8,
				},
				button1: {
					mesh: MODEL_DATA['ricecooker'].button1.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, -2, -.90),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
				button2: {
					mesh: MODEL_DATA['ricecooker'].button2.mesh,
					mat: 'green',
					offset: new THREE.Vector3(.15, -3.3, -.90),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
				button3: {
					mesh: MODEL_DATA['ricecooker'].button3.mesh,
					mat: 'orange',
					offset: new THREE.Vector3(-.15, -3.3, -.90),
					rotation: new THREE.Vector3(Math.PI/2, 0, 0),
				},
			}
		}
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
			mat: 'black',
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

const excludeColors = ['black', 'lightgray', 'gray', 'white', 'lightgray2', 'darkgray', 'blackline', 'redline'];
const allColors = (Object.keys(MAT_DATA)).filter( k => (excludeColors.indexOf(k) === -1) );
const primaryColors = ['red', 'green', 'lightblue', 'orange', 'yellow'];
const baseColors = ['beige', 'lightbeige', 'lightbrown', 'darkbrown',];

const CHAR_DATA_OVERRIDES = {
	astronaut: {
		'upper_eyeLeft': ['black'],
		'upper_eyeRight': ['black'], 
		'upper_head': ['orange', 'beige'],
	},
	poopGuy: {
		'upper_dom': ['lightblue'],
		'upper_eyeRight': ['lightblue'],
		'middle_dom': primaryColors,
		'middle_ring1': primaryColors,
		'middle_ring2': primaryColors,
		'middle_ring3': primaryColors,
		'middle_ring4': primaryColors
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
	breadGuy: {
		'middle_dom': ['lightbeige'],
		'middle_eyeRight': ['black'],
		'middle_eyeLeft': ['black'],
		'middle_eggYolk': ['yellow'],
		'middle_eggWhite': ['white'],
	},
	houseGuy: {
		'middle_dom': ['beige'],
		'top_dom': primaryColors.filter( i => i !== 'yellow'),
		'upperLeft_dom': ['darkgray'],
		'upperRight_dom': ['darkgray'],
		'lowerLeft_dom': ['darkgray'],
		'lowerRight_dom': ['darkgray'],
	},

}
