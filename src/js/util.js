/* WORLD RELATED DATA */

const COLORS = {
    'black': new THREE.Color(0x0f0f0f)
}

const WORLD_RADIUS = 500;

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
  return (time) => {
    //If time for animation
    if(time >= startTime && time <= endTime) {

      //Calculate the parametric parameter along curve
      //using current time
      const timeInAnim = time - startTime
      const currentPropOfCurve = (timeInAnim / timeToMove)

      //In case you wanna see it as we go
      //console.log("Current Proportion of curve: " + currentPropOfCurve)

      //Return the point on the curve
      return curve.getPoint(currentPropOfCurve)
    }
    //Otherwise return curve endpoints
    else if (time < startTime){
      return curve.getPoint(0)
    } else if (time > endTime){
      return curve.getPoint(1)
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
  renderer.setClearColor(COLORS.black)

  container.appendChild( renderer.domElement )

  //Return initialized value in case of chaining
  return renderer
}

const initializeCamera = () => {
  //Set camera to requested position
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.set(0, 5, 10)
  //Similar to above
  return camera
}

//Initialize Controls
const initializeControls = ( camera, renderer) => {
  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.rotateSpeed = 2.0
  controls.panSpeed = 0.8
  controls.zoomSpeed = 1.5

  return controls;
}

//Resize camera on window update
const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}
