/* Loaded data */

const RIG_DATA = {
	'test-anim': null,
}

let MODEL_DATA = {
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

let FONT_DATA = {
    'fugue': null,
}

/* Static data */

let MAT_DATA; 
let CHAR_DATA;

/* Assign after loading dependencies */

const initData = () => {
	MAT_DATA = {
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

	}

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
			upper: [
				{
					offset: new THREE.Vector3(0, 4.75, 0),
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
					offset: new THREE.Vector3(.2, .1, .51)
				},
				{
					name: 'antennae',
					geom: new THREE.CylinderGeometry(.03, .05, 3),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, .45, 0),
				},
				{
					name: 'bulb',
					geom: new THREE.SphereGeometry(.25, 16, 16),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(0, .75, 0)
				},
				{
					name: 'mouth',
					geom: round(new THREE.BoxGeometry(1, 2.5, .1, 3, 3), 4),
					mat: MAT_DATA['white'].clone(),
					offset: new THREE.Vector3(0, -.2, .515),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
				{
					name: 'outline',
					geom: round(new THREE.BoxGeometry(1.075, 2.575, .1, 3, 3), 4),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, -.2, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
			],
			middle: [
				{
					offset: new THREE.Vector3(0, 0, 0),
				},
				{
					dom: true,
					name: 'torso',
					geom: new THREE.CylinderGeometry(2.75, 3.7, 4, 4, 12),
					mat: MAT_DATA['lightblue'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				{
					name: 'outline',
					geom: round(new THREE.BoxGeometry(1.35, 2.85, .1, 3, 3), 4),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(-.125, 0, .33),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				{
					name: 'pad1',
					geom: round(new THREE.BoxGeometry(1.25, 2.75, .1, 3, 3), 4),
					mat: MAT_DATA['white'].clone(),
					offset: new THREE.Vector3(-.125, 0, .335),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				{
					name: 'pad2',
					geom: new THREE.CircleGeometry(.6, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(.125, -.17, .34),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				{
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(.05, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				{
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['green'].clone(),
					offset: new THREE.Vector3(.125, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				{
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['yellow'].clone(),
					offset: new THREE.Vector3(.2, .2, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, 0),
				},
				{
					name: 'tag',
					part: true,
					geom: new THREE.PlaneGeometry(.3, 1.4),
					mat: MAT_DATA['darkgray'].clone(),
					offset: new THREE.Vector3(.125, .075, .31),
					rotation: new THREE.Vector3(-Math.PI/16, 0, Math.PI/2),
				},
			],
			leftUpper: [
				{
					offset: new THREE.Vector3(-3.5, 1.3, 0),
				},
				{
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			],
			rightUpper: [
				{
					offset: new THREE.Vector3(3.5, 1.3, 0),
				},
				{
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['lightgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			],
			leftLower: [
				{
					offset: new THREE.Vector3(-2, -3.5, 0),
				},
				{
					dom: true,
					name: 'legLeft',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['gray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			],
			rightLower: [
				{
					offset: new THREE.Vector3(2, -3.5, 0),
				},
				{
					dom: true,
					name: 'legRight',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['gray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			]
		},

		dice: {
			upper: [],
			upperLeft: [
				{
					offset: new THREE.Vector3(-3, 0, 0),
				},
				{	
					name: 'head',
					dom: true, 
					geom: round(new THREE.BoxGeometry(3, 3, 3, 3, 3), 4),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{	
					name: 'eye1',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				{
					name: 'eye2',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .1, .51)
				},
				{
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, Math.PI),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, -.1, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI),
				},
				{
					name: 'letter1',
					geom: getFontGeom('6', FONT_DATA['fugue'], 1.5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			],
			upperRight: [
				{
					offset: new THREE.Vector3(3, 0, 0),
				},
				{	
					name: 'head',
					dom: true, 
					geom: round(new THREE.BoxGeometry(3, 3, 3, 3, 3), 4),
					mat: MAT_DATA['green'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{	
					name: 'line1',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/4)
				},
				{	
					name: 'line2',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4)
				},
				{	
					name: 'line3',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI/4)
				},
				{	
					name: 'line4',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI/4)
				},
				{
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, -Math.PI),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, -.175, .51),
					rotation: new THREE.Vector3(0, Math.PI, Math.PI),
				},
				{
					name: 'letter1',
					geom: getFontGeom('9', FONT_DATA['fugue'], 1.5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
				},
			],
			middle: [],
			lowerLeft: [],
			lowerRight: [],
		},

		astronaut: {
			upper: [
				{
					offset: new THREE.Vector3(0, 5.5, 0),
				},
				{
					dom: true,
					name: 'helmet',
					// geom: round(new THREE.BoxGeometry(5.2, 5.2, 5.2, 3, 3), 4),
					geom: new THREE.SphereGeometry(3.5, 32, 32),
					mat: MAT_DATA['white'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					opacity: .5,
				},
				{	
					name: 'head',
					// dom: true, //if dom, use to calculate position of other parts
					geom: round(new THREE.BoxGeometry(4.5, 4.5, 5.3, 3, 3), 4),
					// geom: new THREE.SphereGeometry(3, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{	
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .1, .4)
				},
				{
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .1, .4)
				},
				{
					name: 'pad1',
					geom: round(new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray'].clone(),
					offset: new THREE.Vector3(-.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
				{
					name: 'pad2',
					geom: round(new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray'].clone(),
					offset: new THREE.Vector3(.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2),
				},
			],
			upperLeft: [
				{
					offset: new THREE.Vector3(-3, 1, 0),
				},
				{
					dom: true,
					name: 'armLeft',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			],
			upperRight: [
				{
					offset: new THREE.Vector3(3, 1, 0),
				},
				{
					dom: true,
					name: 'armRight',
					part: true,
					geom: new THREE.SphereGeometry(.5, 32, 32),
					// geom: new THREE.BoxGeometry(1, 2, 1),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI/12)
				},
			],
			middle: [
				{
					offset: new THREE.Vector3(0, 0, 0),
				},
				{
					dom: true,
					name: 'torso1',
					geom: round(new THREE.CylinderGeometry(1.75, 1.75, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, 2, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				{
					name: 'torso2',
					geom: round(new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, 1.25, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				{
					name: 'torso3',
					geom: round(new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				{
					name: 'torso4',
					geom: round(new THREE.CylinderGeometry(2.5, 2.5, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI/4, 0),
				},
				{
					name: 'torso5',
					geom: new THREE.BoxGeometry(4.76, 1.75, 4, 3, 3),
					mat: MAT_DATA['lightgray'].clone(),
					offset: new THREE.Vector3(0, -1.3, 0),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['lightblue'].clone(),
					offset: new THREE.Vector3(.15, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['green'].clone(),
					offset: new THREE.Vector3(.30, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(.45, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
				{
					name: 'light4',
					geom: new THREE.PlaneGeometry(.9, .9),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.4, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0),
				},
			],
			lowerLeft: [
				{
					offset: new THREE.Vector3(-2, -3.5, 0),
				},
				{
					dom: true,
					name: 'legLeft',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			],
			lowerRight: [
				{
					offset: new THREE.Vector3(2, -3.5, 0),
				},
				{
					dom: true,
					name: 'legRight',
					part: true,
					geom: round(new THREE.BoxGeometry(1, 2, 1, 3, 3), 4),
					mat: MAT_DATA['darkgray'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI/2)
				},
			],
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
			mat: MAT_DATA['black'].clone(),
			offset: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Vector3(0, 0, 0)
		};

		let pos = new THREE.Vector3( (i-numTeeth/2 + .5)*o, -.2, .53);
		console.log(pos);
		t.offset = pos;

		CHAR_DATA['robot'].upper.push(t);
	}

}
