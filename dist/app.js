"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Avatar = function Avatar(rig, parts) {
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

var Avatar2 = function () {
	function Avatar2(rig, parts) {
		_classCallCheck(this, Avatar2);

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

	_createClass(Avatar2, [{
		key: "enableAction",
		value: function enableAction(name) {
			var action = this.actions[name];

			action.enabled = true;
			action.setEffectiveTimeScale(1);
			action.setEffectiveWeight(weight);

			action.play();
		}
	}]);

	return Avatar2;
}();
'use strict';

var RIG_DATA = {
	'test-anim': null
};
"use strict";

var GLOBE_RADIUS = 500;

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

  var geometry = new THREE.Geometry();
  for (var i = 0; i < smoothness; i++) {
    geometry.vertices.push(pointStart.clone().applyAxisAngle(normal, angleDelta * i)); // this is the key operation
  }

  var arc = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: color
  }));
  return arc;
}
'use strict';

var MODELS_PATH = 'assets/models/';

var Loader = function () {
    var manager = new THREE.LoadingManager();
    var objLoader = new THREE.ObjectLoader(manager);
    var fontLoader = new THREE.FontLoader(manager);
    var textureLoader = new THREE.TextureLoader(manager);
    var audioLoader = new THREE.AudioLoader(manager);
    // const $progress = document.getElementById('progress');

    var reduceableModels = ['banana', 'raspberry', 'pumpkin'];

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    manager.onLoad = function () {
        // init();
    };

    this.loadRig = function (file) {

        var path = MODELS_PATH + file + '.json';

        objLoader.load(path, function (loadedObject) {

            var mesh = void 0;

            loadedObject.traverse(function (child) {

                if (child instanceof THREE.SkinnedMesh) {

                    mesh = child;
                    child.material.transparent = true;
                    child.material.opacity = 0;
                    RIG_DATA[file] = mesh;

                    console.log('load rig');
                    init();
                }
            });

            if (mesh === undefined) {

                alert('Unable to find a SkinnedMesh in this place:\n\n' + url + '\n\n');
                return;
            }
        });
    };

    this.loadTexture = function (file) {
        textureLoader.load(TEXTURE_ASSETS_PATH + file + '.png', function (texture) {
            TEXTURE_DATA[file] = texture;
        });
    };

    this.loadFont = function (file) {
        fontLoader.load(FONT_ASSETS_PATH + file + '.typeface.json', function (font) {
            FONTS_DATA[file].font = font;
        });
    };

    this.loadAudio = function (file, ext) {
        audioLoader.load(AUDIO_ASSETS_PATH + file + ext, function (buffer) {
            AUDIO_DATA[file].buffer = buffer;
        });
    };

    return this;
}();

for (var obj in RIG_DATA) {
    Loader.loadRig(obj);
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

    var sphereGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 16, 16);
    var sphereMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black,
        specular: COLORS.black,
        shininess: 0
    });

    globe = new THREE.Mesh(sphereGeom, sphereMat);
    // globe.position.y = -GLOBE_RADIUS;
    globe.receiveShadow = true;
    scene.add(globe);

    // testMesh = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 32), new THREE.MeshBasicMaterial({color: 0xff0000}));
    testMesh = new Avatar(RIG_DATA['test-anim']);
    testMesh.position.y += GLOBE_RADIUS + 5;
    var s = .05;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    var container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    scene.add(testMesh);

    // testMesh.enableAction('walk');

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    var x = 0,
        y = 1,
        z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x - .0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    scene.add(curve);

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
    testMesh.position.x = elipsePathPoint.x;
    testMesh.position.y = elipsePathPoint.y;
    testMesh.position.z = elipsePathPoint.z;

    // camera.position.copy(testMesh.position);
    // camera.position.z = 5;
    // testMesh.update(d);
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
'use strict';

var UIController = function () {

	var title = document.getElementById('title'),
	    prompt = document.getElementById('prompt'),
	    answer = document.getElementById('userAnswer'),
	    userSubmitQuote = document.getElementById('userSubmitQuote'),
	    remaining = document.getElementById('userAnswerRemaining'),
	    answerMax = 250;

	var quoteBoxMain = document.getElementById('quoteBoxMain'),
	    quoteAnswer = document.getElementById('quoteAnswer'),
	    quoteClose = quoteBoxMain.getElementsByClassName('close')[0];

	function onAnswerSubmit(e) {

		if (e) e.preventDefault();

		var ans = answer.value;
		console.log(ans);

		title.classList.add('fadeOut');

		return false;
	}

	function showQuoteMain(data) {

		var otherAns = quoteBoxMain.getElementsByClassName('quoteAnswer')[0],
		    username = quoteBoxMain.getElementsByClassName('username')[0];

		otherAns.innerHTML = data.quote;
		username.innerHTML = "-" + data.username;

		quoteBoxMain.classList.add('fadeIn');
	}

	function hideQuoteMain() {
		quoteBoxMain.classList.remove('fadeIn');
		quoteBoxMain.classList.add('fadeOut');
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

	userSubmitQuote.addEventListener('mousedown', onAnswerSubmit);
	quoteClose.addEventListener('mousedown', hideQuoteMain);
	answer.addEventListener('keydown', ansKeyDown);
	answer.addEventListener('blur', keepBlur);

	return {
		showQuoteMain: showQuoteMain
	};
}();
'use strict';

/* WORLD RELATED DATA */

var COLORS = {
<<<<<<< HEAD
  'black': new THREE.Color(0x00010c)
};

var PLANE_WIDTH = 250;
var PLANE_HEIGHT = 750;
=======
  'black': new THREE.Color(0x0f0f0f)
>>>>>>> char-design-2

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
  camera.position.set(25, GLOBE_RADIUS + 5, 25);
  //Similar to above
  return camera;
};

//Initialize Controls
var initializeControls = function initializeControls(camera, renderer) {
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 2.0;
  controls.panSpeed = 0.8;
  controls.zoomSpeed = 1.5;

  return controls;
};

//Resize camera on window update
var resize = function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};