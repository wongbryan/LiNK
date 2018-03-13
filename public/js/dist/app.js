"use strict";

//Util function
var toRad = function toRad(degrees) {
			return Math.PI / 180 * degrees;
};

var getByName = function getByName(name) {
			return function (elem) {
						return elem.name == name;
			};
};

var simpleBob = function simpleBob(mesh, offset, duration) {

			//Move up and down a bit
			var current = {
						yOff: mesh.position.y
			};

			var target = {
						yOff: mesh.position.y + offset
			};

			return new TWEEN.Tween(current).to(target, duration).onUpdate(function () {
						mesh.position.y = current.yOff;
			}).easing(TWEEN.Easing.Quadratic.InOut).repeat(Infinity).yoyo(true);
};

var accordionEffect = function accordionEffect(mesh, offset, duration) {

			var top = mesh.children[0];
			var mid = mesh.children[1];
			var bot = mesh.children[2];

			var prop = {
						ring0: 1,
						ring1: 0.75,
						ring2: 0.5,
						ring3: 0.25
			};

			var current = {
						ring0Y: mid.children[0].position.y,
						ring1Y: mid.children[1].position.y,
						ring2Y: mid.children[2].position.y,
						ring3Y: mid.children[3].position.y,
						topY: top.position.y
			};

			var target = {
						ring0Y: mid.children[0].position.y + offset * prop.ring0,
						ring1Y: mid.children[1].position.y + offset * prop.ring1,
						ring2Y: mid.children[2].position.y + offset * prop.ring2,
						ring3Y: mid.children[3].position.y + offset * prop.ring3,
						topY: top.position.y + offset
			};
			return new TWEEN.Tween(current).to(target, duration).onUpdate(function () {
						mid.children[0].position.y = current.ring0Y;
						mid.children[1].position.y = current.ring1Y;
						mid.children[2].position.y = current.ring2Y;
						mid.children[3].position.y = current.ring3Y;
						top.position.y = current.topY;
			}).easing(TWEEN.Easing.Cubic.InOut).repeat(Infinity).yoyo(true);
};

var starSplit = function starSplit(mesh, rotOffset, duration) {

			var radOffset = toRad(rotOffset);

			var upperLeft = mesh.children.find(getByName("upperLeft"));
			var upperRight = mesh.children.find(getByName("upperRight"));
			var lowerLeft = mesh.children.find(getByName("lowerLeft"));
			var lowerRight = mesh.children.find(getByName("lowerRight"));

			var current = {
						lRotZ: upperLeft.rotation.z,
						rRotZ: upperRight.rotation.z
			};

			var headProp = 0.6;

			var target = {
						lRotZ: upperLeft.rotation.z - radOffset,
						rRotZ: upperRight.rotation.z + radOffset
			};
			return new TWEEN.Tween(current).to(target, duration).onUpdate(function () {
						upperLeft.rotation.z = current.lRotZ;
						upperRight.rotation.z = current.rRotZ;
						lowerLeft.rotation.z = current.lRotZ;
						lowerRight.rotation.z = current.rRotZ;
			}).easing(TWEEN.Easing.Cubic.InOut).repeat(Infinity).yoyo(true);
};

var starSplitHead = function starSplitHead(mesh, rotOffset, duration) {
			var radOffset = toRad(rotOffset);

			var upperLeft = mesh.children.find(getByName("upperLeft"));
			var upperRight = mesh.children.find(getByName("upperRight"));
			var lowerLeft = mesh.children.find(getByName("lowerLeft"));
			var lowerRight = mesh.children.find(getByName("lowerRight"));

			//Head look up on star split
			var upper = mesh.children.find(getByName("upper"));

			var current = {
						lRotZ: upperLeft.rotation.z,
						rRotZ: upperRight.rotation.z,
						upRotX: upper.rotation.x
			};

			var headProp = 0.6;

			var target = {
						lRotZ: upperLeft.rotation.z - radOffset,
						rRotZ: upperRight.rotation.z + radOffset,
						upRotX: upper.rotation.x - radOffset * headProp
			};
			return new TWEEN.Tween(current).to(target, duration).onUpdate(function () {
						upperLeft.rotation.z = current.lRotZ;
						upperRight.rotation.z = current.rRotZ;
						lowerLeft.rotation.z = current.lRotZ;
						lowerRight.rotation.z = current.rRotZ;
						upper.rotation.x = current.upRotX;
			}).easing(TWEEN.Easing.Cubic.InOut).repeat(Infinity).yoyo(true);
};

var lookAtMouse = function lookAtMouse(mesh, mouse, camera) {
			var curr = {};
			var end = {};
			var upper = mesh.children.find(getByName("upper"));

			var magnitude = 10;

			return new TWEEN.Tween(curr).to(end).onUpdate(function () {

						var width = window.innerWidth;
						var height = window.innerHeight;

						var vecToMouse = new THREE.Vector3().subVectors(camera.position, upper.getWorldPosition());

						//Get camera basis ==> Trying to make it work if camera rotates... but struggling
						var camX = new THREE.Vector3();
						var camY = new THREE.Vector3();
						var camZ = new THREE.Vector3();

						var xMag = width * (1 / 2.0) * 0.8;
						var yMag = height * (1 / 2.0) * 0.8;

						camera.lookAt(upper.getWorldPosition());
						camera.matrixWorldInverse.extractBasis(camX, camY, camZ);

						vecToMouse.add(camX.multiplyScalar(mouse.x * xMag));
						vecToMouse.sub(camY.multiplyScalar(mouse.y * yMag));

						upper.lookAt(vecToMouse);
			}).repeat(Infinity);
};

var diceFlip = function diceFlip(mesh, duration) {
			var upLeft = mesh.children.find(getByName("upperLeft"));

			var upRight = mesh.children.find(getByName("upperRight"));

			var curr = {
						baseRotZ: 0, //This should be the axis that points at camera --> shouldnt be a hard vec to get?
						baseRotY: mesh.rotation.y, // Also could be from an offset?
						rotFaceX: 0,
						rotFaceZ: 0
			};

			var end = {
						baseRotZ: 2 * Math.PI,
						baseRotY: mesh.rotation.y + 3 * Math.PI,
						rotFaceX: 5 * Math.PI,
						rotFaceZ: Math.PI
			};

			return new TWEEN.Tween(curr).to(end, duration).onUpdate(function () {

						mesh.rotation.z = curr.baseRotZ;
						mesh.rotation.y = curr.baseRotY;
						upLeft.rotation.z = curr.rotFaceZ;
						upRight.rotation.z = curr.rotFaceZ;
						upLeft.rotation.x = curr.rotFaceX;
						upRight.rotation.x = curr.rotFaceX;
			}).easing(TWEEN.Easing.Cubic.InOut).delay(2500).repeat(Infinity).yoyo(true);
};

//Doesnt work correctly... yet...
var diceFlipColor = function diceFlipColor(mesh, duration) {
			var upLeftHeadMat = mesh.children.find(getByName("upperLeft")).children.find(getByName("head")).material;
			var upRightHeadMat = mesh.children.find(getByName("upperRight")).children.find(getByName("head")).material;

			var getRandom = function getRandom() {

						var rand = (Math.random() - 0.5) * 2;
						console.log(rand);
						return rand;
			};

			var curr = {
						colLeftR: upLeftHeadMat.color.r,
						colLeftG: upLeftHeadMat.color.g,
						colLeftB: upLeftHeadMat.color.b,
						colRightR: upRightHeadMat.color.r,
						colRightG: upRightHeadMat.color.g,
						colRightB: upRightHeadMat.color.b
			};

			var end = {
						colLeftR: upLeftHeadMat.color.r + getRandom(),
						colLeftG: upLeftHeadMat.color.g + getRandom(),
						colLeftB: upLeftHeadMat.color.b + getRandom(),
						colRightR: upRightHeadMat.color.r + getRandom(),
						colRightG: upRightHeadMat.color.g + getRandom(),
						colRightB: upRightHeadMat.color.b + getRandom()
			};

			return new TWEEN.Tween(curr).to(end, duration).onUpdate(function () {
						upLeftHeadMat.color = new THREE.Color(curr.colLeftR, curr.ColLeftG, curr.colLeftB, 1.0);
						upRightHeadMat.color = new THREE.Color(curr.colRightR, curr.ColRightG, curr.colRightB, 1.0);
			}).easing(TWEEN.Easing.Cubic.InOut).delay(10000).repeat(Infinity);
};

//Returns an array of functions that should be used as an idle anim for
//the mesh
var getIdleAnim = function getIdleAnim(mesh) {
			switch (mesh.name) {
						case "astronaut":
						case "robot":
									return [simpleBob(mesh, 1.4, 800), starSplitHead(mesh, 45, 800)];
						case "poopGuy":
									return [simpleBob(mesh, 1.4, 800), accordionEffect(mesh, 1, 800)];
						case "dice":
									return [simpleBob(mesh, 1.4, 800), diceFlip(mesh, 1600)]; // diceFlipColor(mesh, 1600)]
						default:
									return [simpleBob(mesh, 1.4, 800)];
			}
};
'use strict';

var apibase = 'http://159.203.117.240/api/';

var APIController = function (fetch) {

	async function postEntry(data) {

		try {
			var response = await fetch(apibase + "entries/", {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				return json;
				//console.log("This is your entry: ", json);
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function putEntry(id, data) {

		try {
			var response = await fetch(apibase + "entries/" + id, {
				method: 'PUT',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				//console.log("This is your updated entry: ", json);
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function getLatestDonorEntries(n) {

		try {
			var response = await fetch(apibase + "latest/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				//console.log("This is all of the latest donor entries: ", json.entries);
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function getRecentEntries(n) {
		try {
			var response = await fetch(apibase + "recent/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				//console.log("This is all of the recent entries: ", json.entries);
				return json.entries;
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function getTopDonorEntries(n) {

		try {
			var response = await fetch(apibase + "top/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				//console.log("This is all of the top donors in order: ", json.entries);
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function getEntry(id) {

		try {
			var response = await fetch(apibase + "entries/" + id, {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				//console.log("This is the entry you searched for: ", json);
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function getTotalDonations() {

		try {
			var response = await fetch(apibase + "donations/", {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				//console.log("This is the total donations in cents: ", json.total);
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async function getUniqueEntries(n) {

		try {
			var response = await fetch(apibase + "unique/" + n, {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			});

			var status = response.status;
			if (status >= 200 && status < 300) {
				var json = await response.json();
				return json.entries;
			} else {
				throw new Error(status);
			}
		} catch (e) {
			throw new Error(e.message);
			return [e];
		}
	}

	return {
		postEntry: postEntry,
		putEntry: putEntry,
		getLatestDonorEntries: getLatestDonorEntries,
		getRecentEntries: getRecentEntries,
		getTopDonorEntries: getTopDonorEntries,
		getEntry: getEntry,
		getTotalDonations: getTotalDonations,
		getUniqueEntries: getUniqueEntries
	};
}(window.fetch);
'use strict';

var CreateAudioController = function CreateAudioController() {

	var nightAudios = [];

	for (var i = 0; i < 3; i++) {

		var nightAudio = document.createElement('audio');
		nightAudio.loop = true;
		var path = '/assets/sounds/bg_night' + i + '.mp3';
		nightAudio.src = path;
		nightAudios.push(nightAudio);
	}

	var dayAudio = document.createElement('audio');
	dayAudio.loop = true;
	dayAudio.src = "/assets/sounds/bg_day.mp3";

	function stop(audio) {

		pause(audio);
		audio.currentTime = 0;
	}

	function pause(audio) {

		audio.pause();
	}

	function play(audio) {

		audio.play();
	}

	function fade(audio, dir) {

		var initialVal = dir === 1 ? 0 : 1;
		var targetVal = dir === 1 ? 1 : 0;

		audio.volume = initialVal;
		audio.play();

		var cur = {
			value: initialVal
		};

		var target = {
			value: targetVal
		};

		var t = new TWEEN.Tween(cur).to(target, 800);
		t.easing(TWEEN.Easing.Quadratic.In);
		t.onUpdate(function () {
			audio.volume = cur.value;
		});
		t.start();
	}

	function playNight(n) {

		fade(nightAudios[n], 1);
	}

	function stopNight(n) {

		fade(nightAudios[n], 0);
	}

	function playDay() {

		fade(dayAudio, 1);
	}

	function stopDay() {

		fade(dayAudio, 0);
	}

	function setVolumeNight(n, level) {

		setVolume(nightAudios[n], level);
	}

	function setVolume(audio, level) {

		var cur = {
			value: audio.volume
		};

		var target = {
			value: level
		};

		var t = new TWEEN.Tween(cur).to(target, 800);
		t.easing(TWEEN.Easing.Quadratic.In);
		t.onUpdate(function () {
			audio.volume = cur.value;
		});
		t.start();
	}

	return {

		playNight: playNight,
		stopNight: stopNight,
		playDay: playDay,
		stopDay: stopDay,
		setVolumeNight: setVolumeNight

	};
};
'use strict';

function buildParts(data) {

	var createGeom = function createGeom(type, args) {

		var obj = THREE[type]; //constructor 

		function F(args) {

			return obj.apply(this, args);
		}

		F.prototype = obj.prototype;

		return new F(args);
	};

	var obj = new THREE.Object3D();
	var g = new THREE.Group();
	var z = new THREE.Vector3();

	for (var key in data) {

		var sectionData = data[key];

		if (Object.keys(sectionData).length === 0 || !sectionData.hasOwnProperty('dom')) continue;

		var section = obj.clone();
		section.name = key;
		var sectionBoundingBox = void 0;
		var magnitude = void 0;

		var o = sectionData['offset'] || z;
		section.position.copy(o);

		var dom = sectionData['dom']; //dominant part

		var geom = void 0;

		if (dom.hasOwnProperty('mesh')) {

			geom = dom.mesh.geometry;
		} else if (dom.geom.type === "TextGeometry") {

			var gArgs = dom.geom.args;
			geom = getFontGeom.apply(null, gArgs);
		} else {

			var gType = dom.geom.type;
			var _gArgs = dom.geom.args;
			geom = createGeom(gType, _gArgs);
		}

		geom.computeBoundingBox();
		sectionBoundingBox = geom.boundingBox;
		var max = sectionBoundingBox.max;
		var min = sectionBoundingBox.min;
		magnitude = max.sub(min);

		for (var k in sectionData) {

			if (k === 'offset') {
				continue;
			}

			var d = sectionData[k];

			var part = void 0;

			if (d.hasOwnProperty('mesh')) {

				var mat = getMat(d.mat);
				d.mesh.material = mat;
				part = d.mesh;
			} else if (d.geom.type === "TextGeometry") {

				var _gArgs2 = d.geom.args;
				geom = getFontGeom.apply(null, _gArgs2);
				var _mat = getMat(d.mat);

				part = new THREE.Mesh(geom, _mat);
			} else {

				var _gType = d.geom.type;
				var _gArgs3 = d.geom.args;

				func = THREE[_gType];
				var _geom = createGeom(_gType, _gArgs3);

				// geom = d.round ? round(geom, d.round) : geom;

				if (d.round) {

					var geomExists = false;

					if (ROUNDED_GEOMS.hasOwnProperty(_gType)) {
						(function () {

							var params = JSON.stringify(_geom.parameters);

							ROUNDED_GEOMS[_gType].forEach(function (g) {

								var existingParams = JSON.stringify(g.parameters);

								if (params === existingParams) {

									geomExists = true;
									_geom = g;
								}
							});
						})();
					}

					if (!geomExists) {

						var roundedGeom = round(_geom, d.round);
						_geom = roundedGeom;
						ROUNDED_GEOMS[_gType] = [];
						ROUNDED_GEOMS[_gType].push(roundedGeom);
					}
				}

				var _mat2 = getMat(d.mat);

				part = new THREE.Mesh(_geom, _mat2);
			}

			var n = d.name || k;
			var _offset = d.offset || z;
			var rot = d.rotation || z;
			var opacity = d.opacity || 1;
			var _scale = d.scale || 1;

			_offset = _offset.multiply(magnitude);

			part.position.add(_offset);
			part.rotation.set(rot.x, rot.y, rot.z);
			part.scale.multiplyScalar(_scale);

			if (d.opacity) {

				part.material.transparent = true;
				part.material.opacity = opacity;
			}

			part.name = n;
			section.add(part);
		}

		g.add(section);
	}

	var scale = data['scale'] || 1.;
	var offset = data['offset'] || z;
	g.scale.multiplyScalar(scale);
	g.offset = offset;

	return g;
}

var Avatar = function Avatar(data) {

	var char = data['name'];
	var charData = CHAR_DATA[char];

	var _loop = function _loop(str) {

		var mKey = data[str];
		var keys = str.split('_');

		//console.log(charData);

		if (keys.length < 2) return 'continue';

		var m = mKey;
		var obj = charData;

		keys.forEach(function (k) {

			obj = obj[k];
		});

		obj.mat = m;
	};

	for (var str in data) {
		var _ret2 = _loop(str);

		if (_ret2 === 'continue') continue;
	}

	var g = new THREE.Group();
	g = buildParts(charData);

	//Named for animations
	this.name = data['name'];

	this.__proto__ = g;
};
"use strict";

var checkpoints = [];
var checkpointIndex = 1;
var paused = false;

var checkpointActions = [0, function () {

	AudioController.stopNight(0);
	AudioController.playNight(1);
	WORLD_CONTROLLER.sizeStarField(1, 1300, 100, .2, 300);
	checkpointIndex++;
}, function () {

	AudioController.stopNight(1);
	AudioController.playNight(2);
	WORLD_CONTROLLER.sizeStarField(1, 800, 200, .3, 300);
	checkpointIndex++;
}, function () {

	AudioController.stopNight(2);
	AudioController.playDay();
	WORLD_CONTROLLER.fadeToColor(1600);
	WORLD_CONTROLLER.sizeStarField(1.5, 1200, 500, .4, 600);
	WORLD_CONTROLLER.resetGlobe();
	setTimeout(function () {

		UIController.showDonation();
		WORLD_CONTROLLER.moveCamera('front');
	}, 800);
	paused = true;
	checkpointIndex = 1; //start over?
}];

var user_data = {
	name: "",
	id: 0,
	text: "",
	donation: 0,
	character: null
};

var other_users_data = [];

var ROUNDED_GEOMS = {};

var MAT_DATA = {
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
		metalness: .24
	},
	'blackline': {
		color: 0x000000
	},
	'redline': {
		color: 0xf7312a
	},
	'lightgray': {
		color: 0xf7faff,
		emissive: 0xe8eaef,
		roughness: .0,
		flatShading: false,
		metalness: .75
	},
	'lightgray2': {
		color: 0xf7faff,
		emissive: 0xdbdcdd,
		roughness: .0,
		flatShading: false,
		metalness: .75
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
		metalness: .75
	},
	gray: {
		color: 0xf7faff,
		emissive: 0x86888c,
		roughness: .0,
		flatShading: false,
		metalness: .75
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
	}
};

/* Dynamic data */

var MODEL_DATA = {
	'bread': {},
	'egg': {},
	'poop': {},
	'house': {},
	'ricecooker': {}
};

var FONT_DATA = {
	'fugue': null

	/* Static data */

};var CHAR_DATA = void 0;

/* Assign after loading dependencies. Char data depends on loaded models. */

var initData = function initData() {

	//offset calculated in relation to torso
	//use 'part' property so we don't recursively iterate through 
	//threejs objects
	CHAR_DATA = {

		robot: {
			scale: 2.75,
			offset: new THREE.Vector3(0, 0, 0),
			upper: {
				offset: new THREE.Vector3(0, 4.75, 0),
				dom: {
					name: 'head',
					dom: true, //if dom, use to calculate position of other parts
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [5, 5, 5, 3, 3]
					},
					mat: 'orange',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eyeLeft: {
					name: 'eyeLeft',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eyeRight: {
					name: 'eyeRight',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(.2, .1, .51)
				},
				antennae: {
					name: 'antennae',
					geom: {
						type: 'CylinderGeometry',
						args: [.03, .05, 3]
					},
					mat: 'black',
					offset: new THREE.Vector3(0, .45, 0)
				},
				bulb: {
					name: 'bulb',
					geom: {
						type: 'SphereGeometry',
						args: [.25, 16, 16]
					},
					mat: 'red',
					offset: new THREE.Vector3(0, .75, 0)
				},
				mouth: {
					name: 'mouth',
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1, 2.5, .1, 3, 3]
					},
					mat: 'white',
					offset: new THREE.Vector3(0, -.2, .515),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				},
				outline: {
					name: 'outline',
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1.075, 2.575, .1, 3, 3]
					},
					mat: 'black',
					offset: new THREE.Vector3(0, -.2, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso',
					geom: {
						type: 'CylinderGeometry',
						args: [2.75, 3.7, 4, 4, 12]
					},
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				outline: {
					name: 'outline',
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1.35, 2.85, .1, 3, 3]
					},
					mat: 'red',
					offset: new THREE.Vector3(-.125, 0, .33),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				pad1: {
					name: 'pad1',
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1.25, 2.75, .1, 3, 3]
					},
					mat: 'white',
					offset: new THREE.Vector3(-.125, 0, .335),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				pad2: {
					name: 'pad2',
					geom: {
						type: 'CircleGeometry',
						args: [.6, 32, 32]
					},
					mat: 'orange',
					offset: new THREE.Vector3(.125, -.17, .34),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				light1: {
					name: 'light1',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'red',
					offset: new THREE.Vector3(.05, .2, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				light2: {
					name: 'light2',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'green',
					offset: new THREE.Vector3(.125, .2, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				light3: {
					name: 'light3',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'yellow',
					offset: new THREE.Vector3(.2, .2, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, 0)
				},
				tag: {
					name: 'tag',
					part: true,
					geom: {
						type: 'PlaneGeometry',
						args: [.3, 1.4]
					},
					mat: 'darkgray',
					offset: new THREE.Vector3(.125, .075, .31),
					rotation: new THREE.Vector3(-Math.PI / 16, 0, Math.PI / 2)
				}
			},
			upperLeft: {
				offset: new THREE.Vector3(-1.5, 1.3, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: {
						type: 'SphereGeometry',
						args: [.5, 32, 32]
					},
					mat: 'lightgray',
					offset: new THREE.Vector3(-2, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
			},
			upperRight: {
				offset: new THREE.Vector3(1.5, 1.3, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: {
						type: 'SphereGeometry',
						args: [.5, 32, 32]
					},
					mat: 'lightgray',
					offset: new THREE.Vector3(2, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
			},
			lowerLeft: {
				offset: new THREE.Vector3(-2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legLeft',
					part: true,
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1, 2, 1, 3, 3]
					},
					mat: 'gray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			},
			lowerRight: {
				offset: new THREE.Vector3(2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legRight',
					part: true,
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1, 2, 1, 3, 3]
					},
					mat: 'gray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			}
		},

		dice: {
			scale: 4.,
			offset: new THREE.Vector3(0, 10, 0),
			upper: {},
			upperLeft: {
				offset: new THREE.Vector3(-3, 0, 0),
				dom: {
					name: 'head',
					dom: true,
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [3, 3, 3, 3, 3]
					},
					mat: 'orange',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eye1: {
					name: 'eye1',
					geom: {
						type: 'CircleGeometry',
						args: [.1, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.2, .1, .51)
				},
				eye2: {
					name: 'eye2',
					geom: {
						type: 'CircleGeometry',
						args: [.1, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(.2, .1, .51)
				},
				mouth: {
					name: 'mouth',
					geom: {
						type: 'CircleGeometry',
						args: [.4, 32, 0, Math.PI]
					},
					mat: 'black',
					offset: new THREE.Vector3(0, -.1, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI)
				},
				letter1: {
					name: 'letter1',
					geom: {
						type: 'TextGeometry',
						args: [6, FONT_DATA['fugue'], 1.5]
					},
					mat: 'black',
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				}
			},
			upperRight: {
				offset: new THREE.Vector3(3, 0, 0),
				dom: {
					name: 'head',
					dom: true,
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [3, 3, 3, 3, 3]
					},
					mat: 'green',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				line1: {
					name: 'line1',
					geom: {
						type: 'PlaneGeometry',
						args: [.1, .5]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI / 4)
				},
				line2: {
					name: 'line2',
					geom: {
						type: 'PlaneGeometry',
						args: [.1, .5]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 4)
				},
				line3: {
					name: 'line3',
					geom: {
						type: 'PlaneGeometry',
						args: [.1, .5]
					},
					mat: 'black',
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, Math.PI / 4)
				},
				line4: {
					name: 'line4',
					geom: {
						type: 'PlaneGeometry',
						args: [.1, .5]
					},
					mat: 'black',
					offset: new THREE.Vector3(.2, .15, .51),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 4)
				},
				mouth: {
					name: 'mouth',
					geom: {
						type: 'CircleGeometry',
						args: [.4, 32, 0, -Math.PI]
					},
					mat: 'black',
					offset: new THREE.Vector3(0, -.175, .51),
					rotation: new THREE.Vector3(0, Math.PI, Math.PI)
				},
				letter1: {
					name: 'letter1',
					geom: {
						type: 'TextGeometry',
						args: [9, FONT_DATA['fugue'], 1.5]
					},
					mat: 'black',
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				}
			},
			middle: {},
			lowerLeft: {},
			lowerRight: {}
		},

		astronaut: {
			scale: 2.75,
			offset: new THREE.Vector3(0, 0, 0),
			upper: {
				offset: new THREE.Vector3(0, 5.5, 0),
				dom: {
					dom: true,
					name: 'helmet',
					round: 4,
					geom: {
						type: 'SphereGeometry',
						args: [3.5, 32, 32]
					},
					mat: 'white',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0),
					opacity: .5
				},
				head: {
					name: 'head',
					// dom: true, //if dom, use to calculate position of other parts
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [4.5, 4.5, 5.3, 3, 3]
					},
					mat: 'orange',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				eyeLeft: {
					name: 'eyeLeft',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.2, .1, .4)
				},
				eyeRight: {
					name: 'eyeRight',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(.2, .1, .4)
				},
				pad1: {
					name: 'pad1',
					round: 4,
					geom: {
						type: 'CylinderGeometry',
						args: [1.2, 1.2, .8, 32, 1]
					},
					mat: 'lightgray',
					offset: new THREE.Vector3(-.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				},
				pad2: {
					name: 'pad2',
					round: 4,
					geom: {
						type: 'CylinderGeometry',
						args: [1.2, 1.2, .8, 32, 1]
					},
					mat: 'lightgray',
					offset: new THREE.Vector3(.55, 0, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			},
			upperLeft: {
				offset: new THREE.Vector3(-1.5, 1, 0),
				dom: {
					dom: true,
					name: 'armLeft',
					part: true,
					geom: {
						type: 'SphereGeometry',
						args: [.5, 32, 32]
					},
					mat: 'darkgray',
					offset: new THREE.Vector3(-1.5, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
			},
			upperRight: {
				offset: new THREE.Vector3(1.5, 1, 0),
				dom: {
					dom: true,
					name: 'armRight',
					part: true,
					geom: {
						type: 'SphereGeometry',
						args: [.5, 32, 32]
					},
					mat: 'darkgray',
					offset: new THREE.Vector3(1.5, 0, 0),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 12)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					dom: true,
					name: 'torso1',
					round: 4,
					geom: {
						type: 'CylinderGeometry',
						args: [1.75, 1.75, .8, 32, 1]
					},
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, 2, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso2: {
					name: 'torso2',
					round: 4,
					geom: {
						type: 'CylinderGeometry',
						args: [2.3, 2.3, .8, 32, 1]
					},
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, 1.25, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso3: {
					name: 'torso3',
					round: 4,
					geom: {
						type: 'CylinderGeometry',
						args: [2.3, 2.3, .8, 32, 1]
					},
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso4: {
					name: 'torso4',
					round: 4,
					geom: {
						type: 'CylinderGeometry',
						args: [2.5, 2.5, .8, 32, 1]
					},
					mat: 'lightgray2',
					offset: new THREE.Vector3(0, .5, 0),
					rotation: new THREE.Vector3(0, Math.PI / 4, 0)
				},
				torso5: {
					name: 'torso5',
					geom: {
						type: 'BoxGeometry',
						args: [4.76, 1.75, 4, 3, 3]
					},
					mat: 'lightgray',
					offset: new THREE.Vector3(0, -1.3, 0),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light1: {
					name: 'light1',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'lightblue',
					offset: new THREE.Vector3(.15, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light2: {
					name: 'light2',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'green',
					offset: new THREE.Vector3(.30, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light3: {
					name: 'light3',
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'orange',
					offset: new THREE.Vector3(.45, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				},
				light4: {
					name: 'light4',
					geom: {
						type: 'PlaneGeometry',
						args: [.9, .9]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.4, -1.3, .6),
					rotation: new THREE.Vector3(0, 0, 0)
				}
			},
			lowerLeft: {
				offset: new THREE.Vector3(-2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legLeft',
					part: true,
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1, 2, 1, 3, 3]
					},
					mat: 'darkgray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			},
			lowerRight: {
				offset: new THREE.Vector3(2, -1.5, 0),
				dom: {
					dom: true,
					name: 'legRight',
					part: true,
					round: 4,
					geom: {
						type: 'BoxGeometry',
						args: [1, 2, 1, 3, 3]
					},
					mat: 'darkgray',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(0, 0, Math.PI / 2)
				}
			}
		},

		breadGuy: {
			offset: new THREE.Vector3(0, 2.5, 0),
			scale: 5,
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
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				},
				eggYolk: {
					mesh: MODEL_DATA['egg'].yolk.mesh,
					mat: 'yellow',
					offset: new THREE.Vector3(0, 1.2, 0),
					rotation: new THREE.Vector3(0, -Math.PI / 2, 0)
				},
				eyeLeft: {
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'orange',
					offset: new THREE.Vector3(-.5, 2, .55)
				},
				eyeRight: {
					geom: {
						type: 'CircleGeometry',
						args: [.2, 32, 32]
					},
					mat: 'orange',
					offset: new THREE.Vector3(.5, 2, .55)
				}
			},
			upperLeft: {},
			upperRight: {},
			lowerLeft: {},
			lowerRight: {}

		},

		poopGuy: {
			scale: 7.,
			offset: new THREE.Vector3(0, 10, 0),
			upper: {
				offset: new THREE.Vector3(0, .5, 0),
				dom: {
					geom: {
						type: 'CylinderGeometry',
						args: [.2, .2, .1, 32, 32]
					},
					mat: 'orange',
					offset: new THREE.Vector3(-2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				eyeRight: {
					name: 'eyeRight',
					geom: {
						type: 'CylinderGeometry',
						args: [.2, .2, .1, 32, 32]
					},
					mat: 'orange',
					offset: new THREE.Vector3(2.5, -7, .4),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				browLeft: {
					dom: true,
					geom: {
						type: 'TorusGeometry',
						args: [.25, .075, 16, 20, Math.PI]
					},
					mat: 'orange',
					offset: new THREE.Vector3(-1.5, -1, .4)
				},
				browRight: {
					geom: {
						type: 'TorusGeometry',
						args: [.25, .075, 16, 20, Math.PI]
					},
					mat: 'orange',
					offset: new THREE.Vector3(1.5, -1, .4)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['poop'].top.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, -.25, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring1: {
					mesh: MODEL_DATA['poop'].ring1.mesh,
					mat: 'darkbrown',
					offset: new THREE.Vector3(0, -.35, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring2: {
					mesh: MODEL_DATA['poop'].ring2.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, -.55, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring3: {
					mesh: MODEL_DATA['poop'].ring3.mesh,
					mat: 'darkbrown',
					offset: new THREE.Vector3(0, -.75, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				ring4: {
					mesh: MODEL_DATA['poop'].ring4.mesh,
					mat: 'darkbrown',
					offset: new THREE.Vector3(0, -1, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				}
			}
			// upperLeft: [],
			// upperRight: [],
			// lowerLeft: [],
			// lowerRight: [],
		},

		houseGuy: {
			scale: 8,
			offset: new THREE.Vector3(0, -2.5, 0),
			top: {
				offset: new THREE.Vector3(0, 2.3, 0),
				dom: {
					mesh: MODEL_DATA['house'].roof.mesh,
					mat: 'lightbrown',
					offset: new THREE.Vector3(0, .51, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				}
			},
			middle: {
				offset: new THREE.Vector3(0, 2.5, 0),
				dom: {
					mesh: MODEL_DATA['house'].base.mesh,
					mat: 'beige',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				},
				eyeLeft: {
					geom: {
						type: 'CylinderGeometry',
						args: [.15, .15, .2, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.35, 0, .4),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				eyeRight: {
					geom: {
						type: 'CylinderGeometry',
						args: [.15, .15, .2, 32, 32]
					},
					mat: 'black',
					offset: new THREE.Vector3(.35, 0, .4),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				}
			},
			upperLeft: {
				offset: new THREE.Vector3(-1.5, 2, 0),
				dom: {
					mesh: MODEL_DATA['house'].leftArm.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, -Math.PI / 2, 0)
				}
			},
			upperRight: {
				offset: new THREE.Vector3(1.5, 2, 0),
				dom: {
					mesh: MODEL_DATA['house'].rightArm.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(Math.PI / 2, Math.PI / 2, 0)
				}
			},
			lowerLeft: {
				offset: new THREE.Vector3(-.65, .75, .5),
				dom: {
					mesh: MODEL_DATA['house'].leftLeg.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, Math.PI / 2)
				}
			},
			lowerRight: {
				offset: new THREE.Vector3(.65, .75, .5),
				dom: {
					mesh: MODEL_DATA['house'].rightLeg.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, -Math.PI / 2)
				}
			}
		},

		ricecookerGuy: {
			scale: 7,
			offset: new THREE.Vector3(0, 2, 0),
			middle: {
				offset: new THREE.Vector3(0, 0, 0),
				dom: {
					mesh: MODEL_DATA['ricecooker'].base.mesh,
					mat: 'lightgray',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, Math.PI)
				},
				bottom: {
					mesh: MODEL_DATA['ricecooker'].bottom.mesh,
					mat: 'darkgray',
					offset: new THREE.Vector3(0, -.03, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				},
				bottomofcover: {
					mesh: MODEL_DATA['ricecooker'].bottomofcover.mesh,
					mat: 'darkgray',
					offset: new THREE.Vector3(0, .05, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
					scale: 1.025
				},
				line1: {
					name: 'line1',
					geom: {
						type: 'BoxGeometry',
						args: [.1, .5, .08]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.23, .65, .57),
					rotation: new THREE.Vector3(0, 0, Math.PI / 4),
					scale: .5
				},
				line2: {
					name: 'line2',
					geom: {
						type: 'BoxGeometry',
						args: [.1, .5, .08]
					},
					mat: 'black',
					offset: new THREE.Vector3(-.3, .65, .57),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 4),
					scale: .5
				},
				line3: {
					name: 'line3',
					geom: {
						type: 'BoxGeometry',
						args: [.1, .5, .08]
					},
					mat: 'black',
					offset: new THREE.Vector3(.3, .65, .57),
					rotation: new THREE.Vector3(0, 0, Math.PI / 4),
					scale: .5
				},
				line4: {
					name: 'line4',
					geom: {
						type: 'BoxGeometry',
						args: [.1, .5, .08]
					},
					mat: 'black',
					offset: new THREE.Vector3(.23, .65, .57),
					rotation: new THREE.Vector3(0, 0, -Math.PI / 4),
					scale: .5
				}
			},
			upper: {
				offset: new THREE.Vector3(0, .15, 0),
				dom: {
					mesh: MODEL_DATA['ricecooker'].cover.mesh,
					mat: 'lightgray',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				},
				handle: {
					mesh: MODEL_DATA['ricecooker'].handle.mesh,
					mat: 'lightgray',
					offset: new THREE.Vector3(0, 1.075, 0),
					rotation: new THREE.Vector3(-Math.PI / 2, 0, 0)
				}
			},
			lowerLeft: {
				offset: new THREE.Vector3(0, 1.05, 2),
				dom: {
					mesh: MODEL_DATA['ricecooker'].buttonbase.mesh,
					mat: 'darkgray',
					offset: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Vector3(Math.PI / 2, 0, Math.PI),
					scale: .8
				},
				button1: {
					mesh: MODEL_DATA['ricecooker'].button1.mesh,
					mat: 'lightblue',
					offset: new THREE.Vector3(0, -2, -.90),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				button2: {
					mesh: MODEL_DATA['ricecooker'].button2.mesh,
					mat: 'green',
					offset: new THREE.Vector3(.15, -3.3, -.90),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				},
				button3: {
					mesh: MODEL_DATA['ricecooker'].button3.mesh,
					mat: 'orange',
					offset: new THREE.Vector3(-.15, -3.3, -.90),
					rotation: new THREE.Vector3(Math.PI / 2, 0, 0)
				}
			}
		}

		//custom tweaks so I don't have to copy and paste data

	};var numTeeth = 2;
	for (var i = 0; i < numTeeth; i++) {

		var length = 1;
		var height = 1;
		var o = length / numTeeth / 2;

		var t = {
			name: 'line' + i,
			geom: {
				type: 'BoxGeometry',
				args: [.03, height - .05, .03]
			},
			mat: 'black',
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

var excludeColors = ['black', 'lightgray', 'gray', 'white', 'lightgray2', 'darkgray', 'blackline', 'redline'];
var allColors = Object.keys(MAT_DATA).filter(function (k) {
	return excludeColors.indexOf(k) === -1;
});
var primaryColors = ['red', 'green', 'lightblue', 'orange', 'yellow'];
var baseColors = ['beige', 'lightbeige', 'lightbrown', 'darkbrown'];

var CHAR_DATA_OVERRIDES = {
	astronaut: {
		name: 'astronaut',
		'upper_eyeLeft': ['black'],
		'upper_eyeRight': ['black'],
		'upper_head': ['orange', 'beige']
	},
	poopGuy: {
		name: 'poopGuy',
		'upper_dom': ['lightblue'],
		'upper_eyeRight': ['lightblue'],
		'middle_dom': primaryColors,
		'middle_ring1': primaryColors,
		'middle_ring2': primaryColors,
		'middle_ring3': primaryColors,
		'middle_ring4': primaryColors
	},
	robot: {
		name: 'robot',
		'upper_eyeLeft': ['black'],
		'upper_eyeRight': ['black'],
		'upper_dom': ['orange', 'yellow']
	},
	dice: {
		name: 'dice',
		'upperLeft_dom': ['orange', 'yellow'],
		'upperRight_dom': ['lightblue', 'red']
	},
	breadGuy: {
		name: 'breadGuy',
		'middle_dom': ['lightbeige'],
		'middle_eyeRight': ['black'],
		'middle_eyeLeft': ['black'],
		'middle_eggYolk': ['yellow'],
		'middle_eggWhite': ['white']
	},
	houseGuy: {
		name: 'houseGuy',
		'middle_dom': ['beige'],
		'top_dom': primaryColors.filter(function (i) {
			return i !== 'yellow';
		}),
		'upperLeft_dom': ['darkgray'],
		'upperRight_dom': ['darkgray'],
		'lowerLeft_dom': ['darkgray'],
		'lowerRight_dom': ['darkgray']
	},
	ricecookerGuy: {
		name: 'ricecookerGuy'
	}

};
'use strict';

var GLOBE_RADIUS = 250;

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
      'appearAmt': { value: 0. },
      'maxDist': { value: 40. },
      'size': { value: .1 }
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

var MODELS_PATH = '/assets/models/';
var FONTS_PATH = '/assets/fonts/';

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
        setTimeout(function () {
            //let page render before calling init (push to event queue)
            initData();
            init();
            document.getElementById('loading').style.opacity = 0;
            setTimeout(function () {
                document.getElementById('loading').style.display = "none";
            }, 600);
        }, 0);
    };

    var loadFont = function loadFont(file) {

        var path = FONTS_PATH + file + '.json';

        var font = fontLoader.load(path,

        // onLoad callback
        function (font) {

            FONT_DATA[file] = font;
        });
    };

    var loadObj = function loadObj(file) {

        objLoader.load(MODELS_PATH + file + '.json', function (obj) {

            obj.children.forEach(function (c) {

                if (c instanceof THREE.Mesh) {

                    c.position.set(0, 0, 0); //reset any position changes, position them later
                    c.rotation.set(0, 0, 0);
                    var n = c.name;
                    MODEL_DATA[file][n] = {};

                    MODEL_DATA[file][n].mesh = c;
                }
            });
        });
    };

    var loadTexture = function loadTexture(file) {
        textureLoader.load(TEXTURE_ASSETS_PATH + file + '.png', function (texture) {
            TEXTURE_DATA[file] = texture;
        });
    };

    var loadAudio = function loadAudio(file, ext) {
        audioLoader.load(AUDIO_ASSETS_PATH + file + ext, function (buffer) {
            AUDIO_DATA[file].buffer = buffer;
        });
    };

    return {
        loadFont: loadFont,
        loadTexture: loadTexture,
        loadObj: loadObj,
        loadAudio: loadAudio
    };
}();

for (var file in MODEL_DATA) {
    Loader.loadObj(file);
}

for (var _file in FONT_DATA) {
    Loader.loadFont(_file);
}
'use strict';

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
    spotLight.intensity = .3;
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

    var charName = getRandomCharName(Object.keys(CHAR_DATA));
    // console.log(charName);
    var data = getCharData(charName);
    user_data.character = data;

    var a = new Avatar(data);
    var angle = 2 * Math.PI / 4 * 0;
    var pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));

    a.position.copy(pos);
    a.position.add(a.offset);
    a.rotation.x = angle;

    user_data.character = data;
    testMesh = a;
    testMesh.castShadow = true;

    var testMeshBox = new THREE.Box3().setFromObject(testMesh);
    var testMeshHeight = Math.abs(testMeshBox.max.y - testMeshBox.min.y);
    testMesh.position.y += testMeshHeight / 2 + testMesh.offset.y;

    scene.add(testMesh);

    spotLight.target = testMesh;
    var container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divide(testMesh.scale);
    testMesh.add(container);
    testMesh.light = spotLight;

    scene.add(testMesh);

    globe = new Globe(GLOBE_RADIUS + 2.5, new THREE.Color(0xffe877), testMesh.position);
    // globe.position.y = -GLOBE_RADIUS;
    // globe.receiveShadow = true;
    scene.add(globe);

    var sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 10, 10);
    var sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.teal,
        specular: 0xffffff,
        shininess: 0
    });
    innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    var characters = [];
    var c = {};
    c.name = testMesh.name;
    c.text = testMesh.text;
    c.character = testMesh;
    characters.push(c);

    characters.forEach(function (c) {

        var idleAnims = getIdleAnim(c.character);

        idleAnims.forEach(function (elem) {
            elem.start();
        });
    });

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    clock.start();
    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe);
    WORLD_CONTROLLER.setWorldLights(1);
    WORLD_CONTROLLER.setMainLightIntensity(.3);
    WORLD_CONTROLLER.expandStarField(100);
    WORLD_CONTROLLER.moveCamera('frontClose');

    WORLD_CONTROLLER.animate();
};
'use strict';

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
    spotLight.intensity = 0;
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

    // let charData = getRandomCharacterData();
    // let charData = getCharData('houseGuy');
    // user_data.character = charData;
    // testMesh = new Avatar(charData);

    // let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(0), GLOBE_RADIUS * Math.sin(0));
    // testMesh.position.copy(pos);
    // testMesh.position.add(testMesh.offset);
    // scene.add(testMesh);

    var sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 10, 10);
    var sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.teal,
        specular: 0xffffff,
        shininess: 0
    });
    innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    // userEntries = APIController.getRecentEntries(3);
    // console.log(userEntries);

    var charName = getRandomCharName(Object.keys(CHAR_DATA));
    // console.log(charName);
    var data = getCharData(charName);
    var a = new Avatar(data);
    var angle = 2 * Math.PI / 4 * 0;
    var pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));

    a.position.copy(pos);
    a.position.add(a.offset);
    a.rotation.x = angle;

    user_data.character = data;
    testMesh = a;
    testMesh.castShadow = true;

    var testMeshBox = new THREE.Box3().setFromObject(testMesh);
    var testMeshHeight = Math.abs(testMeshBox.max.y - testMeshBox.min.y);
    testMesh.position.y += testMeshHeight / 2 + testMesh.offset.y;

    scene.add(testMesh);

    spotLight.target = testMesh;
    var container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divide(testMesh.scale);
    testMesh.add(container);
    testMesh.light = spotLight;

    var c = {};
    c.name = testMesh.name;
    c.text = testMesh.text;
    c.character = testMesh;
    checkpoints.push(c);

    APIController.getUniqueEntries(4).then(function (res) {

        entries = res;

        var numPoints = 4;
        var numcheckpoints = 0;
        entries.forEach(function (e, i) {

            var charData = e.character;

            if (charData.name === testMesh.name || numcheckpoints === 3) {
                //do not exceed 3 other chars
                return;
            }

            var a = new Avatar(charData);
            var angle = 2 * Math.PI / numPoints * (numcheckpoints + 1);
            var pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));
            var box = new THREE.Box3().setFromObject(a);
            var height = Math.abs(box.max.y - box.min.y);
            var factor = (height / 2 + a.offset.y) / pos.length();

            pos.multiplyScalar(1 + factor);

            a.position.copy(pos);
            a.position.add(a.offset);

            a.rotation.x = angle;
            a.rotation.y += Math.PI;

            var c = {};
            c.name = e.name;
            c.text = e.text;
            c.character = a;
            checkpoints.push(c);

            innerGlobe.add(a);
            numcheckpoints++;
        });

        /* start animations */

        checkpoints.forEach(function (c) {

            var idleAnims = getIdleAnim(c.character);

            console.log(idleAnims);
            //Start animations
            idleAnims.forEach(function (elem) {
                elem.start();
            });
        });
    });

    globe = new Globe(GLOBE_RADIUS + 2.5, new THREE.Color(0xffe877), testMesh.position);
    // globe.position.y = -GLOBE_RADIUS;
    // globe.receiveShadow = true;
    scene.add(globe);

    // testMesh.position.add(testMesh.offset);
    // testMesh.position.y += GLOBE_RADIUS;
    // let s = 1;
    // testMesh.scale.multiplyScalar(s);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    //Monitor the mouse position
    window.addEventListener('mousemove', mouse_monitor);

    var x = 0,
        y = 1,
        z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x - .0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    // scene.add(curve);

    testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe);
    WORLD_CONTROLLER.setWorldLights(1);
    WORLD_CONTROLLER.setMainLightIntensity(.3);
    WORLD_CONTROLLER.expandStarField(100);
    // WORLD_CONTROLLER.moveCamera('behind');

    UIController = createUIController();

    UIController.setUserCharacter(testMesh.name);
    // UIController.showQuoteMainInfo();

    document.body.addEventListener('keydown', UIController.handleKeyDown);
    document.body.addEventListener('keyup', UIController.handleKeyUp);

    AudioController = CreateAudioController();
    // AudioController.playNight();

    clock.start();
    WORLD_CONTROLLER.animate();
};
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

var SHADERS = {

	monochrome: {

		uniforms: {

			"tDiffuse": { value: null },
			"magnitude": { value: 1. },
			"darkness": { value: .33 },
			"delta": { value: null }

		},

		vertexShader: ["varying highp vec2 vUv;", "void main(){", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join('\n'),

		fragmentShader: ["uniform float darkness;", "uniform float magnitude;", "uniform sampler2D tDiffuse;", "varying highp vec2 vUv;", "void main(){", "vec3 color = texture2D(tDiffuse, vUv).rgb;", "vec3 amt = vec3(0.3, .11, 0.59);", "vec3 gray = vec3(dot(amt, color));", "gl_FragColor = vec4(mix(color, gray, magnitude)-darkness, 1.0);", "}"].join('\n')

	}

};
"use strict";

var TIMELINE = function () {
	//may be necessary later on?

	function update(state) {

		switch (state) {
			case STATES.title:
				break;

		}
	}
}();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var createUIController = function createUIController() {

	//Mobile additions
	document.addEventListener("touchmove", function (e) {
		e.preventDefault();
	});
	//window.addEventListener("load", function() {window.scrollTo(0,0);});

	//Attempt to go full screen
	var body = document.documentElement;
	if (body.requestFullscreen) {
		body.requestFullscreen();
	} else if (body.webkitrequestFullscreen) {
		body.webkitrequestFullscreen();
	} else if (body.mozrequestFullscreen) {
		body.mozrequestFullscreen();
	} else if (body.msrequestFullscreen) {
		body.msrequestFullscreen();
	}

	var threejscanvas = document.getElementById('container');
	var title = document.getElementById('title');

	var quoteInput = document.getElementById('quoteInput'),
	    quoteInputButton = quoteInput.getElementsByClassName('submitButton')[0];

	var quoteForm = document.getElementById('quoteForm');
	quoteForm.onSubmit = onAnswerSubmit;

	quoteInputAnswer = document.getElementById('userAnswer'), remaining = document.getElementById('userAnswerRemaining'), answerMax = 250;

	var nameInput = document.getElementById('nameInput'),
	    nameInputAnswer = document.getElementById('nameInputAnswer'),
	    nameInputClose = nameInput.getElementsByClassName('submitButton')[0];

	var nameForm = document.getElementById('nameForm');

	var quoteMain = document.getElementById('quoteMain'),
	    quoteMainInfo = document.getElementById('quoteMainInfo'),

	// quoteMainInfoOpen = document.getElementById('quoteMainInfoOpen'),
	// quoteMainInfoClose = document.getElementById('quoteMainInfoClose'),
	quoteMainAnswer = document.getElementById('quoteMainAnswer'),
	    quoteMainClose = document.getElementById('quoteMainClose');

	var donation = document.getElementById('donation'),
	    donationForm = document.getElementById('donationForm'),
	    donationClose = document.getElementById('donationClose'),
	    donationSubmit = document.getElementById('donationSubmit'),
	    donationQuoteAnswer = document.getElementById('donationQuoteAnswer'),
	    donationConfirm = document.getElementById('donationConfirm'),
	    userCharacter = document.getElementById('userCharacter'),
	    userCharacterLink = document.getElementById('userCharacterLink'),
	    name = document.getElementById('name'),
	    cvv = document.getElementById('cvv'),
	    number = document.getElementById('number'),
	    expiration = document.getElementById('expiration'),
	    amount = document.getElementById('amount'),
	    email = document.getElementById('email');

	var errorList = document.querySelector('#error');

	var instructions = document.getElementById('instructions');

	/* TITLE SCREEN */

	var titleBlur = 0;
	var opacity = 1;
	var mousedownID = -1; //Global ID of mouse down interval
	function mousedown(event) {

		if (mousedownID == -1) //Prevent multiple loops!
			mousedownID = setInterval(whilemousedown.bind(this), 25 /*execute every 100ms*/);

		var instr = this.getElementsByTagName('p')[0];
		instr.classList.remove('blinkAnim');
	}

	function mouseup(event) {
		if (mousedownID != -1) {
			//Only stop if exists
			clearInterval(mousedownID);
			mousedownID = -1;
		}

		var instr = this.getElementsByTagName('p')[0];
		instr.classList.add('blinkAnim');

		var interval = setInterval(function () {
			if (titleBlur <= 0 && opacity >= 1) {
				clearInterval(interval);
				return;
			}
			titleBlur--;
			var el = this;
			el.style.filter = "blur(" + titleBlur + "px)";

			opacity = opacity > 1 ? 1 : opacity + .01;
			el.style.opacity = opacity;
		}.bind(this), 25);
	}

	function whilemousedown() {
		var el = this;
		if (opacity <= 0 || titleBlur >= 60) {
			showNameInput();
			WORLD_CONTROLLER.setMainLightIntensity(.3);
			el.style.display = 'none';
			clearInterval(mousedownID);
			mousedownID = -1;
			return;
		}
		titleBlur++;
		el.style.filter = "blur(" + titleBlur + "px)";

		opacity -= .01;
		el.style.opacity = opacity;
	}

	title.addEventListener("mousedown", mousedown);
	title.addEventListener("mouseup", mouseup);
	title.addEventListener("mouseout", mouseup);

	//Attempt to just use touch events and bind to mousedown...
	//Not super elegant
	title.addEventListener("touchstart", mousedown);
	title.addEventListener("touchend", mouseup);

	//Add event listener to the body to allow for movement along sphere
	threejscanvas.addEventListener("touchstart", function () {
		if (!paused) WORLD_CONTROLLER.setRotationFactor(-0.005);
	});

	threejscanvas.addEventListener("touchend", function () {
		if (!paused) WORLD_CONTROLLER.setRotationFactor(0);
	});

	/* USER INPUT ANSWER SCREEN */

	function onAnswerSubmit(e) {

		if (e) e.preventDefault();

		var ans = quoteInputAnswer.value;

		if (ans.length === 0) {

			var err = "Answer must be longer than 0 characters.";
			var elem = document.getElementById('quoteInputErr');

			elem.innerHTML = err;
			elem.style.opacity = 1;

			return;
		}

		user_data.text = ans;
		ans = stylizeQuote(ans);
		donationQuoteAnswer.innerHTML = ans;

		showInstructions();
		hideQuoteInput();
		// WORLD_CONTROLLER.shrinkStarField(1200);
		WORLD_CONTROLLER.sizeStarField(1, 100, 60, .1, 300);
		setTimeout(function () {
			WORLD_CONTROLLER.moveCamera('behind');
		}, 800);
		paused = false;

		AudioController.playNight(0);
		//Clear focus
		document.activeElement.blur();
		APIController.postEntry(user_data).then(function (resp) {
			var link = 'localhost:3000/view/' + resp.id;+'/';
			UIController.setUserCharacterLink(link);
		});

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

	var fired = false;

	function handleKeyDown(e) {

		if (paused || fired) {

			return;
		}

		if (e.keyCode === 32 && e.target === document.body) {
			//space

			if (camera.currentPos !== 'behind') {
				WORLD_CONTROLLER.moveCamera('behind');
			}

			hideInstructions();
			fired = true;
			WORLD_CONTROLLER.setRotationFactor(-.005);
		}
	}

	function handleKeyUp(e) {

		if (e.keyCode === 32) {

			fired = false;
			WORLD_CONTROLLER.setRotationFactor(0);
		}
	}

	//quoteMobileButton = document.getElementById('submitName')
	//quoteMobileButton.onclick = onAnswerSubmit

	quoteInputButton.addEventListener('mousedown', onAnswerSubmit);
	quoteInputAnswer.addEventListener('keydown', ansKeyDown);
	quoteInputAnswer.addEventListener('blur', keepBlur);

	/* NAME INPUT SCREEN */

	function onNameInputSubmit(e) {

		e.preventDefault();
		var name = nameInputAnswer.value;

		if (name.length === 0) {

			var err = "Surely you must go by something...";
			var elem = document.getElementById('nameInputErr');

			elem.innerHTML = err;
			elem.style.opacity = 1;;

			return;
		}

		user_data.name = name;

		hideNameInput();
		showQuoteInput();
	}
	nameInputClose.addEventListener('mousedown', onNameInputSubmit);

	/* Util functions for navigation */

	function showTitle() {
		show(title);
	}

	function hideTitle() {
		hide(title);
	}

	function showQuoteInput() {
		show(quoteInput);
	}

	function hideQuoteInput() {
		hide(quoteInput);
	}

	function showNameInput() {
		show(nameInput);
	}

	function hideNameInput() {
		hide(nameInput);
	}

	function showQuoteMain(data) {
		var answer = document.getElementById('quoteMainAnswer'),
		    username = document.getElementById('quoteMainUser');

		if (data && data.text) {
			answer.innerHTML = data.text;
		}
		if (data && data.name) {
			username.innerHTML = "-" + data.name;
		}
		show(quoteMain);
	}

	function showQuoteMainInfo() {
		quoteMainInfo.style.filter = "blur:(" + 0 + "px)";
		quoteMainInfo.style.opacity = 1;
	}

	function hideQuoteMainInfo() {
		quoteMainInfo.style.filter = "blur:(" + 100 + "px)";
		quoteMainInfo.style.opacity = 0;
	}

	function showInstructions() {
		instructions.style.filter = "blur:(" + 0 + "px)";
		instructions.style.opacity = 1;
	}

	function hideInstructions() {
		instructions.style.filter = "blur:(" + 100 + "px)";
		instructions.style.opacity = 0;
	}

	function hideQuoteMain() {
		hide(quoteMain);
	}

	function showDonation() {
		show(donation);
	}

	function hideDonation() {
		hide(donation);
	}

	function setUserCharacter(val) {

		var str = void 0;

		switch (val) {
			case 'breadGuy':
				str = 'bread person';
				break;
			case 'astronaut':
				str = 'astronaut';
				break;
			case 'robot':
				str = 'robot';
				break;
			case 'poopGuy':
				str = 'ring toy (or rainbow-colored poop)';
				break;
			case 'ricecookerGuy':
				str = 'rice cooker';
				break;
			case 'dice':
				str = 'pair of dice';
				break;
			case 'houseGuy':
				str = 'house person';
				break;
		}

		userCharacter.innerHTML = str;
	}

	function setUserCharacterLink(val) {
		userCharacterLink.href = val;
		userCharacterLink.innerHTML = val;
	}

	function hide(elem) {
		elem.classList.remove('fadeInBlur');
		elem.classList.add('fadeOutBlur');
	}

	function show(elem) {
		elem.classList.remove('fadeOutBlur');
		elem.classList.add('fadeInBlur');
	}

	quoteMainClose.addEventListener('mousedown', hideQuoteMain);
	quoteMainClose.addEventListener('mousedown', function () {
		hideQuoteMainInfo();
		WORLD_CONTROLLER.executeAction(checkpointIndex);
		paused = false;
	});

	quoteMainInfoOpen.addEventListener('mousedown', function () {

		if (quoteMainInfo.style.opacity == 0) {
			showQuoteMainInfo();
		} else {
			hideQuoteMainInfo();
		}
	});

	/* DONATION BOX STUFF */
	var card_token = "";

	function errorDisplay(errors) {

		if (Object.keys(errors).length != 0) errorList.innerHTML = "detected error(s):";else {
			errorList.innerHTML = "";
		}
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.entries(errors)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2),
				    key = _step$value[0],
				    err = _step$value[1];

				var errorItem = document.createElement('li');
				errorItem.innerHTML = err.message;
				errorList.appendChild(errorItem);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	function checkDonation(card) {
		var result = [];

		var dollar_regex = /^\d+(?:\.\d{0,2})$/;

		if (!dollar_regex.test(card.amount)) {
			var resultItem = {
				message: 'Invalid dollar amount'
			};
			result[0] = resultItem;
		}

		errorDisplay(result);
		return Object.keys(result).length == 0;
	}

	async function submitDonation(card_token) {
		/* clear error display */
		while (errorList.firstChild) {
			errorList.removeChild(errorList.firstChild);
		}

		var nameVal = name.value,
		    numberVal = number.value,
		    cvvVal = cvv.value,
		    expirationVal = expiration.value,
		    amountVal = amount.value,
		    emailVal = email.value;

		var card = {
			'name': nameVal,
			'number': numberVal,
			'cvv': cvvVal,
			'expiration': expirationVal,
			'amount': amountVal
		};

		if (checkDonation(card)) {

			var _donation = amountVal * 100;
			var destination = "73-1710135";
			var currency = "usd";
			var payload = {
				"source": card_token,
				"amount": _donation,
				"destination": destination,
				"receipt_email": emailVal,
				"currency": currency
			};

			try {
				var response = await fetch("http://159.203.117.240/api/donation", {
					method: 'POST',
					headers: {
						'Content-Type': "application/json; charset=utf-8"
					},
					body: JSON.stringify(payload)
				});
				var status = response.status;
				if (status >= 200 && status < 300) {
					var json = await response.json();
					console.log(json);
					hide(donationForm);
					setTimeout(function () {
						show(donationConfirm);
					}, 300);
					return true;
				} else {
					throw new Error(status);
				}
			} catch (e) {
				var err = {};
				if (e.message >= 500) err[0] = { message: 'The service we use for payments is down/undermaintennance.  Come back another time! Error: ' + e.message };else err[0] = { message: 'Your request could not be sent :( ' + e.message };

				errorDisplay(err);
				throw new Error(e.message);
			}
		}
		return false;
	}

	donationClose.addEventListener('mousedown', hideDonation);

	return {
		showTitle: showTitle,
		hideTitle: hideTitle,
		showQuoteMain: showQuoteMain,
		hideQuoteMain: hideQuoteMain,
		showQuoteMainInfo: showQuoteMainInfo,
		showDonation: showDonation,
		showQuoteInput: showQuoteInput,
		hideQuoteInput: hideQuoteInput,
		handleKeyDown: handleKeyDown,
		handleKeyUp: handleKeyUp,
		submitDonation: submitDonation,
		errorDisplay: errorDisplay,
		setUserCharacter: setUserCharacter,
		setUserCharacterLink: setUserCharacterLink
	};
};
'use strict';

/* WORLD RELATED DATA */

var COLORS = {
  'black': new THREE.Color(0x00010c),
  'yellow': new THREE.Color(0xffce3d),
  'teal': new THREE.Color(0x0d759b)

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
  // renderer.setClearColor(COLORS.black)
  renderer.setClearColor(COLORS.yellow);

  container.appendChild(renderer.domElement);

  //Return initialized value in case of chaining
  return renderer;
};

var initializeCamera = function initializeCamera() {
  //Set camera to requested position
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  // camera.position.set(-GLOBE_RADIUS/3, GLOBE_RADIUS+7.5, 0)
  camera.position.set(0, GLOBE_RADIUS + 30, GLOBE_RADIUS);
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


  console.log(fontData);

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

var tweenScalar = function tweenScalar(source, propName, target) {
  var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : TWEEN.Easing.Quadratic.InOut;
  var callback = arguments[5];
  //tween for scalar target

  var o = {};
  o[propName] = source[propName]; //value
  var t = {};
  t[propName] = target;

  var tw = new TWEEN.Tween(o).to(t, time);
  tw.onUpdate(function () {
    source[propName] = o[propName];
  });
  if (callback) tw.onComplete(function () {
    console.log('callback');
    callback();
  });

  tw.start();

  return tw;
};

var stylizeQuote = function stylizeQuote(string) {

  var punc = ['?', '.', ';', '!'];
  var newStr = '"' + string.slice();
  newStr = newStr.toLowerCase();

  if (punc.indexOf(newStr[newStr.length - 1]) === -1) {
    newStr += '."';
  }

  return newStr;
};

var getRandomCharName = function getRandomCharName(keys) {

  return keys[Math.floor(Math.random() * keys.length)];
};
var getCharData = function getCharData(charName) {

  var overrides = CHAR_DATA_OVERRIDES[charName];

  var data = {};

  data['name'] = charName;

  for (var key in overrides) {

    if (key === 'name') continue;

    var mats = overrides[key];
    var matName = mats[Math.floor(Math.random() * mats.length)];

    data[key] = matName;
  }

  return data;
};

var getMat = function getMat(name) {

  var data = MAT_DATA[name];
  var mat = void 0;

  if (name.substr(name.length - 4) === 'line') {

    mat = new THREE.LineBasicMaterial(data);
  } else {

    mat = new THREE.MeshStandardMaterial(data);
  }

  mat.side = THREE.DoubleSide;

  return mat;
};

function round(geom, n) {

  var modifier = new THREE.SubdivisionModifier(n);
  modifier.modify(geom);

  return geom;
}

var MOUSE_POS = { x: 0.5, y: 0.5 };

var mouse_monitor = function mouse_monitor(e) {
  MOUSE_POS.x = e.clientX / window.innerWidth * 2 - 1;
  MOUSE_POS.y = e.clientY / window.innerHeight * 2 - 1;
};
'use strict';

var createController = function createController(renderer, scene, camera, mainAvatar, globe) {

	var cameraPositions = {
		front: new THREE.Vector3(0, GLOBE_RADIUS + 30, GLOBE_RADIUS),
		frontClose: new THREE.Vector3(0, GLOBE_RADIUS + 30, GLOBE_RADIUS / 2),
		side: new THREE.Vector3(-(GLOBE_RADIUS / 3 + 75), GLOBE_RADIUS + 35, 75),
		behind: new THREE.Vector3(-(GLOBE_RADIUS / 3 + 55), GLOBE_RADIUS + 55, -105),
		diagonal: new THREE.Vector3(-GLOBE_RADIUS / 3, GLOBE_RADIUS + 7.5, GLOBE_RADIUS / 3)
	};

	camera.currentPos = 'front';

	var clock = new THREE.Clock();
	clock.start();

	/* Post processing stuff */

	if (!singleView) {
		var _composer = new THREE.EffectComposer(renderer);
		_composer.addPass(new THREE.RenderPass(scene, camera));

		var _monochromePass = new THREE.ShaderPass(SHADERS.monochrome);
		_composer.addPass(_monochromePass);

		var _shaderPasses = {

			'monochrome': _monochromePass

		};

		turnOnPostProcessing('monochrome');
	}

	function turnOnPostProcessing(name) {

		var pass = shaderPasses[name];
		pass.renderToScreen = true;
		postprocessing = pass;
	}

	function turnOffPostProcessing(passName) {

		if (passName) {

			var pass = shaderPasses[passName];
			pass.renderToScreen = false;
		} else if (postprocessing) {

			postprocessing.renderToScreen = false;
			postprocessing = null;
		}
	}

	function fadeToColor(delay) {

		setTimeout(function () {
			tweenScalar(monochromePass.uniforms['darkness'], 'value', 0, 500, TWEEN.Easing.Quadratic.InOut, turnOffPostProcessing);
			tweenScalar(monochromePass.uniforms['magnitude'], 'value', 0);
		}, delay);
	}

	function sizeStarField(s, delay, targetDist, targetSize, distTime) {

		setTimeout(function () {

			var t = new THREE.Vector3(s, s, s);

			var tween = new TWEEN.Tween(globe.scale).to(t, 1000);
			tween.easing(TWEEN.Easing.Exponential.Out);

			var easing = TWEEN.Easing.Quadratic.InOut;
			// globe.material.uniforms['maxDist'].value = targetDist;
			var tw = tweenScalar(globe.material.uniforms['maxDist'], 'value', targetDist, distTime, easing);
			// tw.onUpdate(function(){
			// 	console.log(globe.material.uniforms['maxDist'].value);
			// })
			tweenScalar(globe.material.uniforms['size'], 'value', targetSize);

			tween.start();
		}, delay);
	}

	function expandStarField(delay) {

		sizeStarField(1.5, delay, 500, .2, 600);
	}

	function shrinkStarField(delay) {

		sizeStarField(1, delay, 100, .2, 300);
	}

	function setMainLightIntensity(n) {

		tweenScalar(mainAvatar.light, 'intensity', n);
	}

	function setWorldLights(appearAmt) {

		globe.material.uniforms['appearAmt'].value = appearAmt;
	}

	function setAvatarOpacity(n) {

		mainAvatar.traverse(function (c) {

			if (c.hasOwnProperty('material')) {

				tweenScalar(c.material, 'opacity', n);
			}
		});
	}

	function moveCamera(pos) {

		var p = cameraPositions[pos];
		var t = new TWEEN.Tween(camera.position).to(p, 800);
		t.easing(TWEEN.Easing.Quadratic.InOut);
		t.start();

		camera.currentPos = pos;
	}

	var rot = {
		val: 0
	};
	var hit = false;

	function update() {

		TWEEN.update();
		var d = clock.getDelta();
		var globalTime = clock.elapsedTime;

		globe.frustumCulled = false;
		globe.rotation.x += .0001;
		controls.update();

		if (rot.val && !paused) {

			innerGlobe.rotation.x += rot.val;
			var angle = 2 * Math.PI / checkpoints.length * checkpointIndex;

			if (innerGlobe.rotation.x <= -angle + Math.PI / 12 && !hit) {
				//stop rotation and only set tween once

				hit = true;

				setRotationFactor(0, function () {
					hit = false;
					paused = true;
					var data = entries[checkpointIndex - 1];
					AudioController.setVolumeNight(checkpointIndex - 1, .5);
					UIController.showQuoteMain(data);
				});
			}
		}
	}

	function updateSingleView() {

		TWEEN.update();
		globe.frustumCulled = false;
		globe.rotation.x += .0001;
		controls.update();
	}

	function executeAction(index) {

		checkpointActions[index]();
	}

	function setRotationFactor(val, callback) {

		tweenScalar(rot, 'val', val, 1000, TWEEN.Easing.Quadratic.InOut, callback);
	}

	function resetGlobe() {

		tweenScalar(innerGlobe.rotation, 'x', 0, 3500, TWEEN.Easing.Quadratic.InOut);
	}

	function animate() {
		TWEEN.update();
		window.requestAnimationFrame(animate);

		if (singleView) {

			updateSingleView();
			renderer.render(scene, camera);
		} else {
			update();

			if (postprocessing) {

				composer.render();
			} else {

				renderer.render(scene, camera);
			}
		}
	}

	return {
		turnOnPostProcessing: turnOnPostProcessing,
		turnOffPostProcessing: turnOffPostProcessing,
		setMainLightIntensity: setMainLightIntensity,
		setWorldLights: setWorldLights,
		setAvatarOpacity: setAvatarOpacity,
		fadeToColor: fadeToColor,
		expandStarField: expandStarField,
		shrinkStarField: shrinkStarField,
		sizeStarField: sizeStarField,
		moveCamera: moveCamera,
		resetGlobe: resetGlobe,
		setRotationFactor: setRotationFactor,
		executeAction: executeAction,
		update: update,
		animate: animate
	};
};