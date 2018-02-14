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

    testMesh = new Avatar(MODEL_DATA['star'].mesh);
    testMesh.castShadow = true;
    let s = .5;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    scene.add(testMesh);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    animate();

}

const update = () => {
  // console.log("Time:" + globalTime)
  // const elipsePathPoint = testMesh.movementFunc(globalTime)
  // testMesh.position.x = elipsePathPoint.x
  // testMesh.position.y = elipsePathPoint.y
  // testMesh.position.z = 10*Math.sin(globalTime);
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
