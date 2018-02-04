//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;

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

    let sphereGeom = new THREE.SphereGeometry(WORLD_RADIUS, 32, 32);
    let sphereMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black, 
        specular: COLORS.black,
    });

    globe = new THREE.Mesh(sphereGeom, sphereMat);
    globe.position.y = -WORLD_RADIUS;
    globe.receiveShadow = true;
    scene.add(globe);

    testMesh = new Avatar(RIG_DATA['test-anim']);
    let s = .05;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    scene.add(testMesh);

    testMesh.enableAction('walk');

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    animate();

}

const update = () => {
  // console.log("Time:" + globalTime)
  let globalTime = clock.elapsedTime;
  
  const elipsePathPoint = testMesh.movementFunc(globalTime)
  testMesh.position.x = elipsePathPoint.x
  testMesh.position.y = elipsePathPoint.y
  testMesh.position.z = 10*Math.sin(globalTime);
  testMesh.position.z -= .05;
  testMesh.update(clock.getDelta());
  controls.update();
}

const animate = () => {

    window.requestAnimationFrame(animate)
    update();

    //Animation should be extracted into its own function
    //but you get the point for now.

    //Render the frame
    renderer.render(scene, camera)
}
//Run the update call for the first time, registering
//it for every animation frame.
