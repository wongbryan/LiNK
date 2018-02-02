
//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var plane, testMesh;

const init = () => {
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

    let planeGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    let planeMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black, 
        specular: COLORS.black,
    });

    plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -Math.PI/2;
    plane.receiveShadow = true;
    scene.add(plane);

    // testMesh = new THREE.Mesh(
    //     new THREE.SphereGeometry( 1, 32, 32 ),
    //     new THREE.MeshStandardMaterial({
    //         color: 0xffffff,
    //         emissive: 0x000000
    //     })
    // );
    // testMesh.castShadow = true;
    // testMesh.position.set(0, 5, 0);
    // spotLight.target = testMesh;
    // testMesh.add(spotLight);
    // scene.add(testMesh);

    testMesh = new Avatar(RIG_DATA['test-anim']);
    let s = .05;
    testMesh.scale.set(s, s, s);
    scene.add(testMesh);

    clock = new THREE.Clock();
    clock.start();

    window.addEventListener('resize', resize);

    animate();

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

const getLineFromCurve = (curve, numPointsOnCurve=50, colorCurve=0xff0000) => {
  let points = curve.getPoints( numPointsOnCurve );
  let geometry = new THREE.BufferGeometry().setFromPoints( points );
  let material = new THREE.LineBasicMaterial( { color : colorCurve } );
  let curveLine = new THREE.Line( geometry, material );

  return curveLine

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

//Draw curve on scene so we can see it
// scene.add(getLineFromCurve(spline))

// testMesh.movementFunc = genMoveAlongCurve(spline, 5, 1)


const update = (globalTime) => {
  // console.log("Time:" + globalTime)
  // const elipsePathPoint = testMesh.movementFunc(globalTime)
  // testMesh.position.x = elipsePathPoint.x
  // testMesh.position.y = elipsePathPoint.y
  testMesh.position.z = 10*Math.sin(globalTime);
  controls.update();
}

const animate = () => {
    //Get the elapsed time from our starting of the clock.
    //We check every frame
    const globalTime = clock.getElapsedTime()
    update(globalTime)

    testMesh.mixer.update(clock.getDelta());

    //Animation should be extracted into its own function
    //but you get the point for now.

    //Render the frame
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
//Run the update call for the first time, registering
//it for every animation frame.
