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

    const data = entry.character;

    const a = new Avatar(data);
    const angle = 2*Math.PI / 4 * 0;
    let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));
    
    a.position.copy(pos);
    a.position.add(a.offset);
    a.rotation.x = angle;

    testMesh = a;
    testMesh.castShadow = true;
    
    const testMeshBox = new THREE.Box3().setFromObject(testMesh);
    const testMeshHeight = Math.abs(testMeshBox.max.y - testMeshBox.min.y);
    testMesh.position.y += testMeshHeight / 2 + testMesh.offset.y;

    scene.add(testMesh);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divide(testMesh.scale);
    testMesh.add(container);
    testMesh.light = spotLight;

    scene.add(testMesh);

    const characters = [];
    const c = {};
    c.name = testMesh.name;
    c.text = testMesh.text;
    c.character = testMesh;
    characters.push(c);

    characters.forEach( c => {

        const idleAnims = getIdleAnim(c.character)

        idleAnims.forEach( elem => {
           elem.start()
        });

    });

    globe = new Globe(GLOBE_RADIUS+2.5, new THREE.Color(0xffe877), testMesh.position);
    // globe.position.y = -GLOBE_RADIUS;
    // globe.receiveShadow = true;
    scene.add(globe);

    let sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 10, 10);
    let sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.teal, 
        specular: 0xffffff,
        shininess: 0
    });
    innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    clock.start();
    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe);
    WORLD_CONTROLLER.setWorldLights(1);
    WORLD_CONTROLLER.setMainLightIntensity(.3);
    WORLD_CONTROLLER.expandStarField(100);
    WORLD_CONTROLLER.moveCamera('frontClose');

    WORLD_CONTROLLER.animate();

}