'use strict';

function buildParts(data) {

	var obj = new THREE.Object3D();
	var g = new THREE.Group();
	var z = new THREE.Vector3();

	for (var key in data) {

		var sectionData = data[key];
		var section = obj.clone();
		section.name = key;
		var sectionBoundingBox = void 0;
		var magnitude = void 0;

		var o = sectionData['offset'];
		section.position.copy(o);

		var dom = sectionData['dom']; //dominant part
		var geom = dom.geom || dom.mesh.geometry;

		geom.computeBoundingBox();
		sectionBoundingBox = geom.boundingBox;
		var max = sectionBoundingBox.max;
		var min = sectionBoundingBox.min;
		magnitude = max.sub(min);

		for (var k in sectionData) {

			var d = sectionData[k];

			var part = void 0;

			if (d.hasOwnProperty('mesh')) {

				d.mesh.material = d.matOverride || d.mat;
				part = d.mesh;
			} else {

				var _geom = d.geom;
				var mat = d.matOverride || d.mat;

				part = new THREE.Mesh(_geom, mat);
			}

			var n = d.name;
			var offset = d.offset || z;
			var rot = d.rotation || z;
			var opacity = d.opacity;

			offset = offset.multiply(magnitude);

			part.position.add(offset);
			part.rotation.set(rot.x, rot.y, rot.z);

			if (d.opacity) {

				part.material.transparent = true;
				part.material.opacity = opacity;
			}

			part.name = n;
			section.add(part);
		}

		g.add(section);
	}

	return g;
}

var Avatar = function Avatar(data) {

	var char = data['name'];
	var charData = Object.assign({}, CHAR_DATA[char]);

	var _loop = function _loop(str) {

		var mKey = data[str];
		var keys = str.split('_');

		if (keys.length < 2) return 'continue';

		var m = MAT_DATA[mKey];
		var obj = charData;

		keys.forEach(function (k) {

			obj = obj[k];
		});

		console.log(obj);

		obj.mat = m;
	};

	for (var str in data) {
		var _ret = _loop(str);

		if (_ret === 'continue') continue;
	}

	console.log(charData);

	var g = new THREE.Group();
	g = buildParts(charData);

	this.__proto__ = g;
};
'use strict';

var MAT_DATA = {
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
		metalness: .24
	}),
	'blackline': new THREE.LineBasicMaterial({
		color: 0x000000
	}),
	'redline': new THREE.LineBasicMaterial({
		color: 0xf7312a
	}),
	'lightgray': new THREE.MeshStandardMaterial({
		color: 0xf7faff,
		emissive: 0xe8eaef,
		roughness: .0,
		flatShading: false,
		metalness: .75
	}),
	'lightgray2': new THREE.MeshStandardMaterial({
		color: 0xf7faff,
		emissive: 0xdbdcdd,
		roughness: .0,
		flatShading: false,
		metalness: .75
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
		metalness: .75
	}),
	gray: new THREE.MeshStandardMaterial({
		color: 0xf7faff,
		emissive: 0x86888c,
		roughness: .0,
		flatShading: false,
		metalness: .75
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
	})
};

/* Dynamic data */

var MODEL_DATA = {
	'bread': {
		backing: {},
		bread: {},
		crust: {}
	},
	'poop': {
		top: {},
		ring1: {},
		ring2: {},
		ring3: {},
		ring4: {}
	}
};

var FONT_DATA = {
	'fugue': null

	/* Static data */

};var CHAR_DATA = void 0;

/* Assign after loading dependencies. Char data depends on loaded models. */

var initData = function initData() {

	function round(geom, n) {
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
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eyeLeft: {
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .1, .51)
				},
				antennae: {
					name: 'antennae',
					geom: new THREE.CylinderGeometry(.03, .05, 3),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, .45, 0)
				},
				bulb: {
					name: 'bulb',
					geom: new THREE.SphereGeometry(.25, 16, 16),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(0, .75, 0)
				},
				mouth: {
					name: 'mouth',
					geom: round(new THREE.BoxGeometry(1, 2.5, .1, 3, 3), 4),
					mat: MAT_DATA['white'].clone(),
					offset: new THREE.Vector3(0, -.2, .515),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				},
				outline: {
					name: 'outline',
					geom: round(new THREE.BoxGeometry(1.075, 2.575, .1, 3, 3), 4),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, -.2, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso',
					geom: new THREE.CylinderGeometry(2.75, 3.7, 4, 4, 12),
					mat: MAT_DATA['lightblue'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				outline: {
					name: 'outline',
					geom: round(new THREE.BoxGeometry(1.35, 2.85, .1, 3, 3), 4),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(-.125, 0, .33),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				pad1: {
					name: 'pad1',
					geom: round(new THREE.BoxGeometry(1.25, 2.75, .1, 3, 3), 4),
					mat: MAT_DATA['white'].clone(),
					offset: new THREE.Vector3(-.125, 0, .335),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				pad2: {
					name: 'pad2',
					geom: new THREE.CircleGeometry(.6, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(.125, -.17, .34),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				light1: {
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['red'].clone(),
					offset: new THREE.Vector3(.05, .2, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				light2: {
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['green'].clone(),
					offset: new THREE.Vector3(.125, .2, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				light3: {
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['yellow'].clone(),
					offset: new THREE.Vector3(.2, .2, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				tag: {
					name: 'tag',
					part: true,
					geom: new THREE.PlaneGeometry(.3, 1.4),
					mat: MAT_DATA['darkgray'].clone(),
					offset: new THREE.Vector3(.125, .075, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, Math.PI / 2)
				}
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
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
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
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
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
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
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
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			}
		},

		dice: {
			upper: [],
			upperLeft: {
				offset: new THREE.Vector3(-3, 0, 0),
				dom: {
					name: 'head',
					dom: true,
					geom: round(new THREE.BoxGeometry(3, 3, 3, 3, 3), 4),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eye1: {
					name: 'eye1',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eye2: {
					name: 'eye2',
					geom: new THREE.CircleGeometry(.1, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .1, .51)
				},
				mouth: {
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, Math.PI),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, -.1, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI)
				},
				letter1: {
					name: 'letter1',
					geom: getFontGeom('6', FONT_DATA['fugue'], 1.5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				}
			},
			upperRight: {
				offset: new THREE.Vector3(3, 0, 0),
				dom: {
					name: 'head',
					dom: true,
					geom: round(new THREE.BoxGeometry(3, 3, 3, 3, 3), 4),
					mat: MAT_DATA['green'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				line1: {
					name: 'line1',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI / 4)
				},
				line2: {
					name: 'line2',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 4)
				},
				line3: {
					name: 'line3',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI / 4)
				},
				line4: {
					name: 'line4',
					geom: new THREE.PlaneGeometry(.1, .5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 4)
				},
				mouth: {
					name: 'mouth',
					geom: new THREE.CircleGeometry(.4, 32, 0, -Math.PI),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, -.175, .51),
					rotation: new THREE.Vector3(0, Math.PI, Math.PI)
				},
				letter1: {
					name: 'letter1',
					geom: getFontGeom('9', FONT_DATA['fugue'], 1.5),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				}
			},
			middle: {},
			lowerLeft: {},
			lowerRight: {}
		},

		astronaut: {
			upper: {
				offset: new THREE.Vector3(0, 5.5, 0),
				dom: {
					dom: true,
					name: 'helmet',
					// geom: round(new THREE.BoxGeometry(5.2, 5.2, 5.2, 3, 3), 4),
					geom: new THREE.SphereGeometry(3.5, 32, 32),
					mat: MAT_DATA['white'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					opacity: .5
				},
				head: {
					name: 'head',
					// dom: true, //if dom, use to calculate position of other parts
					geom: round(new THREE.BoxGeometry(4.5, 4.5, 5.3, 3, 3), 4),
					// geom: new THREE.SphereGeometry(3, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eyeLeft: {
					name: 'eyeLeft',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.2, .1, .4)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(.2, .1, .4)
				},
				pad1: {
					name: 'pad1',
					geom: round(new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray'].clone(),
					offset: new THREE.Vector3(-.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				},
				pad2: {
					name: 'pad2',
					geom: round(new THREE.CylinderGeometry(1.2, 1.2, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray'].clone(),
					offset: new THREE.Vector3(.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
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
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
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
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso1',
					geom: round(new THREE.CylinderGeometry(1.75, 1.75, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, 2, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso2: {
					name: 'torso2',
					geom: round(new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, 1.25, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso3: {
					name: 'torso3',
					geom: round(new THREE.CylinderGeometry(2.3, 2.3, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso4: {
					name: 'torso4',
					geom: round(new THREE.CylinderGeometry(2.5, 2.5, .8, 32, 1), 4),
					mat: MAT_DATA['lightgray2'].clone(),
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso5: {
					name: 'torso5',
					geom: new THREE.BoxGeometry(4.76, 1.75, 4, 3, 3),
					mat: MAT_DATA['lightgray'].clone(),
					offset: new THREE.Vector3(0, -1.3, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light1: {
					name: 'light1',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['lightblue'].clone(),
					offset: new THREE.Vector3(.15, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light2: {
					name: 'light2',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['green'].clone(),
					offset: new THREE.Vector3(.30, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light3: {
					name: 'light3',
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(.45, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light4: {
					name: 'light4',
					geom: new THREE.PlaneGeometry(.9, .9),
					mat: MAT_DATA['black'].clone(),
					offset: new THREE.Vector3(-.4, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				}
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
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
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
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			}
		},

		breadGuy: {
			upper: {},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['bread'].backing.mesh,
					mat: MAT_DATA['beige'],
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eyeLeft: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(-.5, 2, .55)
				},
				eyeRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CircleGeometry(.2, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(.5, 2, .55)
				}
			},
			upperLeft: {},
			upperRight: {},
			lowerLeft: {},
			lowerRight: {}

		},

		poopGuy: {
			upper: {
				offset: new THREE.Vector3(0, .5, 0),
				dom: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CylinderGeometry(.2, .2, .1, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(-2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				eyeRight: {
					name: 'eyeRight',
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.CylinderGeometry(.2, .2, .1, 32, 32),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				browLeft: {
					dom: true,
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.TorusGeometry(.25, .075, 16, 20, Math.PI),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(-1.5, -1, .4)
				},
				browRight: {
					// geom: new THREE.TorusGeometry(.2, .05, 16, 32),
					geom: new THREE.TorusGeometry(.25, .075, 16, 20, Math.PI),
					mat: MAT_DATA['orange'].clone(),
					offset: new THREE.Vector3(1.5, -1, .4)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['poop'].top.mesh,
					mat: MAT_DATA['lightbrown'],
					offset: new THREE.Vector3(0, -.25, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring1: {
					mesh: MODEL_DATA['poop'].ring1.mesh,
					mat: MAT_DATA['darkbrown'],
					offset: new THREE.Vector3(0, -.35, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring2: {
					mesh: MODEL_DATA['poop'].ring2.mesh,
					mat: MAT_DATA['lightbrown'],
					offset: new THREE.Vector3(0, -.55, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring3: {
					mesh: MODEL_DATA['poop'].ring3.mesh,
					mat: MAT_DATA['darkbrown'],
					offset: new THREE.Vector3(0, -.75, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring4: {
					mesh: MODEL_DATA['poop'].ring4.mesh,
					mat: MAT_DATA['darkbrown'],
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				}
			}
			// upperLeft: [],
			// upperRight: [],
			// lowerLeft: [],
			// lowerRight: [],

		}

		//custom tweaks so I don't have to copy and paste data

	};var numTeeth = 2;
	for (var i = 0; i < numTeeth; i++) {

		var length = 1;
		var height = 1;
		var o = length / numTeeth / 2;

		var t = {
			name: 'line' + i,
			geom: new THREE.BoxGeometry(.03, height - .05, .03),
			mat: MAT_DATA['black'].clone(),
			offset: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Vector3(0, 0, 0)
		};

		var pos = new THREE.Vector3((i - numTeeth / 2 + .5) * o, -.2, .53);
		console.log(pos);
		t.offset = pos;

		var n = 'line' + i;

		CHAR_DATA['robot'].upper[n] = t;
	}
};

var test = {
	id: '',
	name: 'robot',
	upper_dom: 'black',
	upper_eyeLeft: 'white'
};

var test2 = {
	id: '',
	name: 'astronaut',
	upper_dom: 'white'
	// upper_eyeLeft: 'orange',
};
'use strict';

var GLOBE_RADIUS = 500;

var Globe = function Globe(radius, color, avatarPos) {

  /* Calculate offset (positions) of each instance */

  var MAX_VERTICES = 4000;

  var sGeom = new THREE.SphereGeometry(radius, 32, 32);
  var g = new THREE.SphereBufferGeometry(1, 16, 16);
  var geom = new THREE.InstancedBufferGeometry();
  geom.copy(g);
  var positions = THREE.GeometryUtils.randomPointsInGeometry(sGeom, MAX_VERTICES);

  var vOffsetArr = new Float32Array(MAX_VERTICES * 3);

  positions.forEach(function (p, i) {

    var index = i * 3;
    vOffsetArr[index] = p.x;
    vOffsetArr[index + 1] = p.y;
    vOffsetArr[index + 2] = p.z;
  });

  var vOffset = new THREE.InstancedBufferAttribute(vOffsetArr, 3, 1);
  geom.addAttribute('vOffset', vOffset);

  var mat = new THREE.ShaderMaterial({
    uniforms: {
      'avatarPos': { value: avatarPos },
      'appearAmt': { value: .5 },
      'maxDist': { value: 200. }
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
    vertexShader: document.getElementById('globeVertex').textContent,
    fragmentShader: document.getElementById('globeFragment').textContent,
    side: THREE.DoubleSide
  });

  var p = new THREE.Mesh(geom, mat);

  this.__proto__ = p;
};

function setArc3D(pointStart, pointEnd, smoothness, color, clockWise) {
  // calculate a normal ( taken from Geometry().computeFaceNormals() )
  var cb = new THREE.Vector3(),
      ab = new THREE.Vector3(),
      normal = new THREE.Vector3();
  cb.subVectors(new THREE.Vector3(), pointEnd);
  ab.subVectors(pointStart, pointEnd);
  cb.cross(ab);
  normal.copy(cb).normalize();

  var angle = pointStart.angleTo(pointEnd); // get the angle between vectors
  if (clockWise) angle = angle - Math.PI * 2; // if clockWise is true, then we'll go the longest path
  var angleDelta = angle / (smoothness - 1); // increment

  var myRand = getRndInteger(3, 6);
  var myRand2 = getRndInteger(3, 6);

  var geometry = new THREE.Geometry();
  for (var i = 0; i < smoothness; i++) {
    var mynorm = new THREE.Vector3();
    mynorm.set(Math.sin(myRand * Math.PI * i / 2999) / (Math.PI / myRand2), normal.y, normal.z);
    mynorm.normalize();
    geometry.vertices.push(pointStart.clone().applyAxisAngle(mynorm, angleDelta * i)); // this is the key operation
  }

  var arc = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: color
  }));
  return arc;
}

function getRndInteger(min, max) {
  var n = Math.floor(Math.random() * (max - min + 1)) + min;
  if (Math.random() >= 0.5) {
    n = n * -1;
  }
  return n;
}
'use strict';

var GlowMesh = function GlowMesh(geom, color) {

    var mat = new THREE.ShaderMaterial({
        uniforms: {
            'glowColor': { value: color },
            'c': { value: 0 },
            'p': { value: 5 }
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.FrontSide
    });

    var mesh = new THREE.Mesh(geom, mat);

    this.__proto__ = mesh;
};
'use strict';

var MODELS_PATH = 'assets/models/';
var FONTS_PATH = 'assets/fonts/';

var Loader = function () {
    var manager = new THREE.LoadingManager();
    var objLoader = new THREE.ObjectLoader(manager);
    var textureLoader = new THREE.TextureLoader(manager);
    var audioLoader = new THREE.AudioLoader(manager);
    var jsonLoader = new THREE.JSONLoader(manager);
    var fontLoader = new THREE.FontLoader(manager);
    // const $progress = document.getElementById('progress');

    var reduceableModels = ['banana', 'raspberry', 'pumpkin'];

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    manager.onLoad = function () {
        initData();
        init();
    };

    this.loadFont = function (file) {

        var path = FONTS_PATH + file + '.json';

        var font = fontLoader.load(path,

        // onLoad callback
        function (font) {

            FONT_DATA[file] = font;
        });
    };

    this.loadObj = function (file) {

        objLoader.load(MODELS_PATH + file + '.json', function (obj) {

            obj.children.forEach(function (c) {

                if (c instanceof THREE.Mesh) {

                    c.position.set(0, 0, 0); //reset any position changes, position them later
                    c.rotation.set(0, 0, 0);
                    var n = c.name;
                    var d = MODEL_DATA[file][n];

                    d.mesh = c;
                }
            });
        });
    };

    this.loadTexture = function (file) {
        textureLoader.load(TEXTURE_ASSETS_PATH + file + '.png', function (texture) {
            TEXTURE_DATA[file] = texture;
        });
    };

    this.loadAudio = function (file, ext) {
        audioLoader.load(AUDIO_ASSETS_PATH + file + ext, function (buffer) {
            AUDIO_DATA[file].buffer = buffer;
        });
    };

    return this;
}();

for (var file in MODEL_DATA) {
    Loader.loadObj(file);
}

for (var _file in FONT_DATA) {
    Loader.loadFont(_file);
}
"use strict";

//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;

var init = function init() {
    scene = new THREE.Scene();
    renderer = initializeRenderer();
    camera = initializeCamera();
    controls = initializeControls(camera, renderer);

    spotLight = new THREE.SpotLight();
    spotLight.intensity = .6;
    spotLight.distance = 85;
    spotLight.penumbra = 1;
    spotLight.angle = .8;
    spotLight.decay = 1.5;

    spotLight.shadow.camera.left = -5;
    spotLight.shadow.camera.right = 55;
    spotLight.shadow.camera.top = 5;
    spotLight.shadow.camera.bottom = -5;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 100;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.castShadow = true;
    spotLight.position.set(-10, 30, 0);
    scene.add(spotLight);

    testMesh = new Avatar(test);
    testMesh.castShadow = true;
    testMesh.position.y = GLOBE_RADIUS + 5;
    var s = .5;
    testMesh.scale.multiplyScalar(s);

    // testMesh2 = new Avatar(test2);
    // testMesh2.castShadow = true;
    // testMesh2.position.y = GLOBE_RADIUS+5;
    // testMesh2.position.x += 5;
    // testMesh2.scale.multiplyScalar(s);
    // scene.add(testMesh2);

    spotLight.target = testMesh;
    var container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    scene.add(testMesh);

    globe = new Globe(GLOBE_RADIUS + 5, new THREE.Color(0xffe877), testMesh.position);
    // globe.position.y = -GLOBE_RADIUS;
    // globe.receiveShadow = true;
    scene.add(globe);

    var sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32);
    var sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black,
        specular: COLORS.black,
        shininess: 0
    });
    var innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    var x = 0,
        y = 1,
        z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x - .0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    // scene.add(curve);

    testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    // let a = new THREE.AmbientLight();
    // scene.add(a);

    clock.start();
    animate();
};

var update = function update() {
    var d = clock.getDelta();
    var globalTime = clock.elapsedTime;

    var elipsePathPoint = testMesh.movementFunc(globalTime);

    // camera.lookAt(testMesh);
    // testMesh.position.x = elipsePathPoint.x
    // testMesh.position.y = elipsePathPoint.y
    // testMesh.position.z = elipsePathPoint.z;

    // camera.position.copy(testMesh.position);
    // camera.position.z = 5;
    // testMesh.update(d);

    globe.frustumCulled = false;
    globe.rotation.x += .0005;
    controls.update();
};

var animate = function animate() {

    window.requestAnimationFrame(animate);
    update();

    //Animation should be extracted into its own function
    //but you get the point for now.

    //Render the frame
    renderer.render(scene, camera);
};
//Run the update call for the first time, registering
//it for every animation frame.
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RiggedAvatar = function RiggedAvatar(rig, parts) {
	var mesh = rig;
	var bones = rig.skeleton.bones;

	/* TODO: ADD PARTS TO EACH BONE */
	var ball = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
	bones.forEach(function (bone) {
		var b = ball.clone();
		bone.add(b);
	});

	var anims = rig.geometry.animations;
	var actions = {};
	var mixer = new THREE.AnimationMixer(mesh);
	mixer.timeScale = 1;

	anims.forEach(function (anim) {
		var name = anim.name;
		actions[name] = mixer.clipAction(name);
	});

	function setWeight(action, weight) {
		action.enabled = true;
		action.setEffectiveTimeScale(1);
		action.setEffectiveWeight(weight);
	}

	function enableAction(name) {
		var action = actions[name];
		setWeight(action, 1);
		action.play();
	}

	function update(d) {
		mixer.update(d);
	}

	this.update = update;
	this.enableAction = enableAction;
	this.__proto__ = mesh;
};

/* ES6 Implementation */

var RiggedAvatar2 = function () {
	function RiggedAvatar2(rig, parts) {
		_classCallCheck(this, RiggedAvatar2);

		var mesh = rig;
		var bones = rig.skeleton.bones;

		for (var i = 0; i < bones.length; i++) {
			var ball = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
			bones[i].add(ball);
		}

		var anims = rig.geometry.animations,
		    actions = {};

		var mixer = new THREE.AnimationMixer(mesh);
		mixer.timeScale = 1;

		anims.forEach(function (anim) {
			var name = anim.name;
			actions[name] = mixer.clipAction(name);
		});

		this.mixer = mixer;
		this._animations = anims;
		this._actions = actions;
		this.__proto__ = mesh;
	}

	_createClass(RiggedAvatar2, [{
		key: "enableAction",
		value: function enableAction(name) {
			var action = this.actions[name];

			action.enabled = true;
			action.setEffectiveTimeScale(1);
			action.setEffectiveWeight(weight);

			action.play();
		}
	}]);

	return RiggedAvatar2;
}();
"use strict";

var APIController = function (fetch) {

	function submitEntry(data) {

		fetch('http://159.203.117.240/api/v1/entries/', {

			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(data)

		}).then(function (res) {

			console.log(res);
		}).catch(function (res) {

			console.log(res);
		});
	}

	return {
		submitEntry: submitEntry
	};
}(window.fetch);
'use strict';

var UIController = function () {

	var title = document.getElementById('title'),
	    titleButton = title.getElementsByClassName('submitButton')[0];

	var quoteInput = document.getElementById('quoteInput'),
	    quoteInputButton = quoteInput.getElementsByClassName('submitButton')[0],
	    prompt = document.getElementById('prompt'),
	    quoteInputAnswer = document.getElementById('userAnswer'),
	    remaining = document.getElementById('userAnswerRemaining'),
	    answerMax = 250;

	var quoteMain = document.getElementById('quoteMain'),
	    quoteMainAnswer = document.getElementById('quoteAnswer'),
	    quoteMainButton = quoteMain.getElementsByClassName('close')[0];

	/* TITLE SCREEN */

	var titleBlur = 0;
	var opacity = 1;
	var mousedownID = -1; //Global ID of mouse down interval
	function mousedown(event) {

		if (mousedownID == -1) //Prevent multiple loops!
			mousedownID = setInterval(whilemousedown.bind(this), 25 /*execute every 100ms*/);
	}

	function mouseup(event) {
		if (mousedownID != -1) {
			//Only stop if exists
			clearInterval(mousedownID);
			mousedownID = -1;
		}

		var interval = setInterval(function () {
			if (titleBlur <= 0) {
				clearInterval(interval);
				return;
			}
			titleBlur--;
			var el = this;
			el.style.filter = "blur(" + titleBlur + "px)";
		}.bind(this), 25);
	}

	function whilemousedown() {
		titleBlur++;
		var el = this;
		el.style.filter = "blur(" + titleBlur + "px)";

		opacity -= .005;
		el.style.opacity = opacity;
	}

	// title.addEventListener("mousedown", mousedown);
	// title.addEventListener("mouseup", mouseup);
	// title.addEventListener("mouseout", mouseup);

	titleButton.addEventListener('mousedown', function () {
		hideTitle();
		showQuoteInput();
	});

	/* USER INPUT ANSWER SCREEN */

	function onAnswerSubmit(e) {

		if (e) e.preventDefault();

		var ans = quoteInputAnswer.value;

		hideQuoteInput();

		return false;
	}

	function ansKeyDown(e) {

		if (e.which == 13) {
			e.preventDefault();
			onAnswerSubmit();
		}

		var el = e.target;
		el.style.height = el.scrollHeight + 'px';

		var amt = answerMax - el.value.length;
		remaining.innerHTML = amt;
	}

	function keepBlur() {
		var el = this;
		el.focus();
	}

	quoteInputButton.addEventListener('mousedown', onAnswerSubmit);
	quoteInputAnswer.addEventListener('keydown', ansKeyDown);
	quoteInputAnswer.addEventListener('blur', keepBlur);

	/* Util functions for navigation */

	function showTitle() {
		show(title);
	}

	function hideTitle() {
		hide(title);
	}

	function showQuoteMain(data) {
		var otherAns = quoteMain.getElementsByClassName('quoteAnswer')[0],
		    username = quoteMain.getElementsByClassName('username')[0];

		otherAns.innerHTML = data.quote;
		username.innerHTML = "-" + data.username;

		quoteMain.classList.add('fadeIn');
	}

	function hideQuoteMain() {
		hide(quoteMain);
	}

	function showQuoteInput() {
		show(quoteInput);
	}

	function hideQuoteInput() {
		hide(quoteInput);
	}

	function hide(elem) {
		elem.classList.remove('fadeIn');
		elem.classList.add('fadeOut');
	}

	function show(elem) {
		elem.classList.remove('fadeOut');
		elem.classList.add('fadeIn');
	}

	quoteClose.addEventListener('mousedown', hideQuoteMain);

	return {
		showTitle: showTitle,
		hideTitle: hideTitle,
		showQuoteMain: showQuoteMain,
		hideQuoteMain: hideQuoteMain,
		showQuoteInput: showQuoteInput,
		hideQuoteInput: hideQuoteInput
	};
}();
'use strict';

/* WORLD RELATED DATA */

var COLORS = {
  'black': new THREE.Color(0x00010c)

  //Some example curves to test curve movement
  //Pulled from THREEJS Docs : https://threejs.org/docs/#api/extras/curves/EllipseCurve
};var ellipseCurve = new THREE.EllipseCurve(0, 0, // ax, aY
20, 20, // xRadius, yRadius
0, 2 * Math.PI, // aStartAngle, aEndAngle
false, // aClockwise
0 // aRotation
);

var cubicBezier = new THREE.CubicBezierCurve(new THREE.Vector2(-10, 0), new THREE.Vector2(-5, 15), new THREE.Vector2(20, 15), new THREE.Vector2(10, 0));

var quadBezier = new THREE.QuadraticBezierCurve(new THREE.Vector2(-10, 0), new THREE.Vector2(20, 15), new THREE.Vector2(10, 0));

// Create a sine-like wave
var spline = new THREE.SplineCurve([new THREE.Vector2(-10, 0), new THREE.Vector2(-5, 5), new THREE.Vector2(0, 0), new THREE.Vector2(5, -5), new THREE.Vector2(10, 0)]);

var getLineFromCurve = function getLineFromCurve(curve) {
  var numPointsOnCurve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var colorCurve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0xff0000;

  var points = curve.getPoints(numPointsOnCurve);
  var geometry = new THREE.BufferGeometry().setFromPoints(points);
  var material = new THREE.LineBasicMaterial({ color: colorCurve });
  var curveLine = new THREE.Line(geometry, material);

  return curveLine;
};

//Move along curve returns a function to be
//passed to animate with an object that has a position
//Time to move should be passed in as
var genMoveAlongCurve = function genMoveAlongCurve(curve, timeToMove, startTime) {

  var endTime = startTime + timeToMove;
  var vertices = curve.geometry.vertices;
  return function (time) {
    //If time for animation
    if (time >= startTime && time <= endTime) {

      //Calculate the parametric parameter along curve
      //using current time
      var timeInAnim = time - startTime;
      var currentPropOfCurve = timeInAnim / timeToMove;
      var index = Math.floor(currentPropOfCurve * vertices.length);

      //In case you wanna see it as we go
      //console.log("Current Proportion of curve: " + currentPropOfCurve)

      //Return the point on the curve
      return vertices[index];
    }
    //Otherwise return curve endpoints
    else if (time < startTime) {
        return vertices[0];
      } else if (time > endTime) {
        return vertices[vertices.length - 1];
      }
  };
};

/* SETUP TOOLS */

var initializeRenderer = function initializeRenderer() {

  var container = document.getElementById('container');
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(COLORS.black);

  container.appendChild(renderer.domElement);

  //Return initialized value in case of chaining
  return renderer;
};

var initializeCamera = function initializeCamera() {
  //Set camera to requested position
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, GLOBE_RADIUS + 5, 20);
  //Similar to above
  return camera;
};

//Initialize Controls
var initializeControls = function initializeControls(camera, renderer) {
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 2.0;
  controls.panSpeed = 0.8;
  controls.zoomSpeed = 1.5;

  controls.target = new THREE.Vector3(0, GLOBE_RADIUS, 0);

  return controls;
};

//Resize camera on window update
var resize = function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

var getFontGeom = function getFontGeom(letter, fontData, size) {
  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : .1;


  var textGeometry = new THREE.TextGeometry(letter, {
    font: fontData,
    size: size,
    height: height,
    curveSegments: 20
  });
  textGeometry.computeBoundingBox();
  var box = textGeometry.boundingBox;
  var mag = box.max.sub(box.min);
  textGeometry.translate(-mag.x / 2, -mag.y / 2, -mag.z / 2);

  return textGeometry;
};

var getEdgesGeom = function getEdgesGeom(geom) {
  //use w THREE.LineSegments or THREE.Line and line material

  return new THREE.EdgesGeometry(geom);
};
"use strict";

var WORLD_CONTROLLER = function WORLD_CONTROLLER() {};