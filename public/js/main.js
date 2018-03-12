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

    // let charData = getRandomCharacterData();
    let charData = getCharData('breadGuy');
    user_data.character = charData;
    
    testMesh = new Avatar(charData);
    testMesh.castShadow = true;
    testMesh.position.add(testMesh.offset);
    testMesh.position.y += GLOBE_RADIUS;
    let s = 1;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    testMesh.light = spotLight;

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
    innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    //Monitor the mouse position
    window.addEventListener('mousemove', mouse_monitor);
    
    let x = 0, y = 1, z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x-.0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    // scene.add(curve);

    //Good for poop dude
    let idleAnims = getIdleAnim(testMesh)
    
    //Start animations
    idleAnims.forEach( elem => {
	elem.start()
    })

    //Set checkpoints
    const numPoints = 3;

    for(let i=0; i<numPoints; i++){

        const charName = getRandomCharName();
        const data = getCharData(charName);
        const a = new Avatar(data);
        const angle = 2*Math.PI / numPoints;
        let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));
        pos.y += 2.5;
        pos.z += 2.5;
        a.position.copy(pos);
        a.rotation.x = angle;

        let c = {};

        c.hit = false;
        c.character = a;

        scene.add(a);

    }
    
    testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe);
    WORLD_CONTROLLER.setWorldLights(1);
    WORLD_CONTROLLER.setMainLightIntensity(.3);
    WORLD_CONTROLLER.expandStarField(100);

    clock.start();
    WORLD_CONTROLLER.animate();

}
