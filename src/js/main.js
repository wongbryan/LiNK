//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;

var camController;

const init = () => {
    scene = new THREE.Scene();
    renderer = initializeRenderer();
    camera = initializeCamera();
    //controls = initializeControls(camera, renderer);

    
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

    let sphereGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 16, 16);
    let sphereMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black, 
        specular: COLORS.black,
        shininess: 0
    });

    globe = new THREE.Mesh(sphereGeom, sphereMat);
    // globe.position.y = -GLOBE_RADIUS;
    globe.receiveShadow = true;
    scene.add(globe);

    testMesh = new Avatar(MODEL_DATA['star'].mesh);
    testMesh.castShadow = true;
    testMesh.position.y = GLOBE_RADIUS;
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

    let x = 0, y = 1, z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x-.0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    scene.add(curve);

    console.log("Showing globe");
    console.log(globe)

    
    camController = new CameraController(20, 20, globe.position, 0.5, 0.5);
    camController.init(testMesh, camera);

//     let a = new THREE.AmbientLight();
//     scene.add(a);

    clock.start();
    testMesh.movementFunc = genMoveAlongCurve(curve, 200, clock.elapsedTime);
    
    animate();

}

const update = () => {
    var d = clock.getDelta();
    let globalTime = clock.elapsedTime;

    let elipsePathPoint = testMesh.movementFunc(globalTime)

    //camera.lookAt(testMesh);
    let movementVec = new THREE.Vector3().sub(elipsePathPoint - testMesh.position);
    
testMesh.position.x = elipsePathPoint.x
testMesh.position.y = elipsePathPoint.y
testMesh.position.z = elipsePathPoint.z;

    camController.update(0, testMesh, 0, camera)
    
//    camera.position.copy(testMesh.position);
  //  camera.position.y += 3;
    //camera.position.z += 3;
    //camera.lookAt(testMesh);

    //testMesh.update(d);
    //controls.update();
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
