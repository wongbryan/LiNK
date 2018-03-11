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

    let charData = getRandomCharacterData();
    user_data.character = charData;

    testMesh = new Avatar(charData);
    testMesh.castShadow = true;
    testMesh.position.y = GLOBE_RADIUS+5;
    let s = 1;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    testMesh.light = spotLight;
    testMesh.rotation.y = Math.PI/2;

    scene.add(testMesh);

    globe = new Globe(GLOBE_RADIUS+2.5, new THREE.Color(0xffe877), testMesh.position);
    // globe.position.y = -GLOBE_RADIUS;
    // globe.receiveShadow = true;
    scene.add(globe);

    let sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32);
    let sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.teal,
        specular: 0xffffff,
        shininess: 0
    });
    let innerGlobe = new THREE.Mesh(sGeom, sMat);
    innerGlobe.name = "innerGlobe";
    scene.add(innerGlobe);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    // let x = 1, y = 0, z = 0; // checkpoint one


    let checkData1 = getRandomCharacterData();
    checkpoint1 = new Avatar(checkData1);
    checkpoint1.position.x = GLOBE_RADIUS+5;
    checkpoint1.scale.divideScalar(s);
    checkpoint1.rotation.z = -Math.PI/2;
    checkpoint1.name = "Checkpoint1";

    scene.add(checkpoint1);
    innerGlobe.add(checkpoint1);


    let checkData2 = getRandomCharacterData();
    checkpoint2 = new Avatar(checkData2);
    checkpoint2.position.y = -(GLOBE_RADIUS+5);
    checkpoint2.scale.divideScalar(s);
    checkpoint2.rotation.z = Math.PI;
    checkpoint2.name = "Checkpoint2";

    scene.add(checkpoint2);
    innerGlobe.add(checkpoint2);






    // var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    // var pointEnd = new THREE.Vector3(x-.0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    // var curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    // // scene.add(curve);
    //
    // testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe, innerGlobe);
    WORLD_CONTROLLER.setWorldLights(1);
    WORLD_CONTROLLER.setMainLightIntensity(.3);

    clock.start();
    WORLD_CONTROLLER.animate();

}
