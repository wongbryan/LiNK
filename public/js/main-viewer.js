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

    //let charData = getRandomCharacterData();
    //user_data.character = charData;
    const charName = getRandomCharName(Object.keys(CHAR_DATA));
    // console.log(charName);
    const charData = getCharData(charName);
    
    
    testMesh = new Avatar(charData);
    testMesh.castShadow = true;
    testMesh.position.y = GLOBE_RADIUS+5;
    let s = .5;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    testMesh.light = spotLight;

    // WORLD_CONTROLLER.setMainLightIntensity(0);
    // WORLD_CONTROLLER.setAvatarOpacity(0);

    scene.add(testMesh);

    // globe = new Globe(GLOBE_RADIUS+5, new THREE.Color(0xffe877), testMesh.position);
    // // globe.position.y = -GLOBE_RADIUS;
    // // globe.receiveShadow = true;
    // scene.add(globe);

    let sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32);
    let sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black, 
        specular: COLORS.black,
        shininess: 0
    });
    let innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    let x = 0, y = 1, z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x-.0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    // scene.add(curve);

    testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    // let a = new THREE.AmbientLight();
    // scene.add(a);

    clock.start();
    animate();

}

const update = () => {
    TWEEN.update();
    var d = clock.getDelta();
    let globalTime = clock.elapsedTime;

    let elipsePathPoint = testMesh.movementFunc(globalTime)

    // camera.lookAt(testMesh);
    // testMesh.position.x = elipsePathPoint.x
    // testMesh.position.y = elipsePathPoint.y
    // testMesh.position.z = elipsePathPoint.z;

    // camera.position.copy(testMesh.position);
    // camera.position.z = 5;
    // testMesh.update(d);

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
