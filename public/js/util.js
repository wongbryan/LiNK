/* WORLD RELATED DATA */

const COLORS = {
    'black': new THREE.Color(0x00010c),
    'yellow': new THREE.Color(0xffce3d),
    'teal': new THREE.Color(0x0d759b),
}

//Some example curves to test curve movement
//Pulled from THREEJS Docs : https://threejs.org/docs/#api/extras/curves/EllipseCurve
const ellipseCurve = new THREE.EllipseCurve(
  0,  0,            // ax, aY
  20, 20,           // xRadius, yRadius
  0,  2 * Math.PI,  // aStartAngle, aEndAngle
  false,            // aClockwise
  0                 // aRotation
);

const cubicBezier = new THREE.CubicBezierCurve(
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 15 ),
  new THREE.Vector2( 20, 15 ),
  new THREE.Vector2( 10, 0 )
);

const quadBezier = new THREE.QuadraticBezierCurve(
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( 20, 15 ),
  new THREE.Vector2( 10, 0 )
);

// Create a sine-like wave
const spline = new THREE.SplineCurve( [
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 5 ),
  new THREE.Vector2( 0, 0 ),
  new THREE.Vector2( 5, -5 ),
  new THREE.Vector2( 10, 0 )
] );

const getLineFromCurve = (curve, numPointsOnCurve=50, colorCurve=0xff0000) => {
  let points = curve.getPoints( numPointsOnCurve );
  let geometry = new THREE.BufferGeometry().setFromPoints( points );
  let material = new THREE.LineBasicMaterial( { color : colorCurve } );
  let curveLine = new THREE.Line( geometry, material );

  return curveLine

}

//Move along curve returns a function to be
//passed to animate with an object that has a position
//Time to move should be passed in as
const genMoveAlongCurve = (curve, timeToMove, startTime) => {

  const endTime = startTime + timeToMove
  var vertices = curve.geometry.vertices;
  return (time) => {
    //If time for animation
    if(time >= startTime && time <= endTime) {

      //Calculate the parametric parameter along curve
      //using current time
      const timeInAnim = time - startTime
      const currentPropOfCurve = (timeInAnim / timeToMove)
      let index = Math.floor( currentPropOfCurve * vertices.length );

      //In case you wanna see it as we go
      //console.log("Current Proportion of curve: " + currentPropOfCurve)

      //Return the point on the curve
      return vertices[index];
    }
    //Otherwise return curve endpoints
    else if (time < startTime){
      return vertices[0];
    } else if (time > endTime){
      return vertices[vertices.length-1];
    }
  }
}

/* SETUP TOOLS */

const initializeRenderer = () => {

  const container = document.getElementById( 'container' )
  let renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCSoftShadowMap
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  // renderer.setClearColor(COLORS.black)
  renderer.setClearColor(COLORS.yellow)

  container.appendChild( renderer.domElement )

  //Return initialized value in case of chaining
  return renderer
}

const initializeCamera = () => {
  //Set camera to requested position
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
  // camera.position.set(-GLOBE_RADIUS/3, GLOBE_RADIUS+7.5, 0)
  camera.position.set(0, GLOBE_RADIUS+7.5, GLOBE_RADIUS/3)
  //Similar to above
  return camera
}

//Initialize Controls
const initializeControls = ( camera, renderer) => {
  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.rotateSpeed = 2.0
  controls.panSpeed = 0.8
  controls.zoomSpeed = 1.5

  controls.target = new THREE.Vector3(0, GLOBE_RADIUS, 0);

  return controls;
}

//Resize camera on window update
const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}

const getFontGeom = (letter, fontData, size, height=.1) => {

  var textGeometry = new THREE.TextGeometry(letter, {
      font: fontData,
      size: size,
      height: height,
      curveSegments: 20
  });
  textGeometry.computeBoundingBox();
  let box = textGeometry.boundingBox;
  let mag = box.max.sub(box.min);
  textGeometry.translate(-mag.x/2, -mag.y/2, -mag.z/2);

  return textGeometry;

}

const getEdgesGeom = (geom) => { //use w THREE.LineSegments or THREE.Line and line material

  return new THREE.EdgesGeometry( geom );

}

const tweenScalar = (source, propName, target, easing=TWEEN.Easing.Quadratic.InOut) => { //tween for scalar target

  let o = {};
  o[propName] = source[propName]; //value
  let t = {};
  t[propName] = target;

  let tw = new TWEEN.Tween(o).to(t);
  tw.onUpdate(function(){
    source[propName] = o[propName];
  });

  tw.start();

  return tw;

}

const stylizeQuote = function(string){

  const punc = ['?', '.', ';', '!'];
  let newStr = '"' + string.slice();
  newStr = newStr.toLowerCase();

  if(punc.indexOf(newStr[newStr.length-1]) === -1){
    newStr += '."';
  }

  return newStr;

}

const getRandomCharacterData = function(){

  let keys = Object.keys(CHAR_DATA_OVERRIDES);
  let charName = keys[Math.floor(Math.random() * keys.length)];
  // let charName = 'robot';
  let overrides = CHAR_DATA_OVERRIDES[charName];

  let data = {};

  data['name'] = charName;

  for(let key in overrides){

    let mats = overrides[key];
    let matName = mats[Math.floor(Math.random() * mats.length)];

    data[key] = matName;

  }

  return data;

}
