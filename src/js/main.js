//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;
var cc, controls;

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


    //Initialize the avatars position

    testMesh = new Avatar();

    testMesh.castShadow = true;
    testMesh.position.y = GLOBE_RADIUS+5;
    let s = .5;
    testMesh.scale.multiplyScalar(s);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divideScalar(s);
    testMesh.add(container);
    scene.add(testMesh);

    globe = new Globe(GLOBE_RADIUS+5, new THREE.Color(0xffe877), testMesh.position);
    // globe.position.y = -GLOBE_RADIUS;
    // globe.receiveShadow = true;
    scene.add(globe);

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

    let x = 0,
	y = 1,
	z = 0
    
    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x-.0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);

    let arc = setArc3D(pointStart, pointEnd, 3000, "lime", true);

    let curve = new THREE.SplineCurve3(arc.geometry.vertices)

    let movement = moveAlongCurve(testMesh, curve, {easing:TWEEN.Easing.Quadratic.Out, duration:600000, delay:0})

    cc = new CameraController(10, 10, new THREE.Vector3(0,0,0), 20, 20)

    cc.init(testMesh, camera)

    movement.start()
    
    scene.add(arc);
    
    clock.start();
    animate();

}

const update = () => {
    var d = clock.getDelta();
    let globalTime = clock.elapsedTime;

    TWEEN.update();
      cc.update(0, testMesh, testMesh.velocity, camera)
    //controls.update()

    globe.frustumCulled = false;
    globe.rotation.x += .0005;

}

const animate = (time) => {

    window.requestAnimationFrame(animate)
    TWEEN.update(time)
    update();

    //Render the frame
    renderer.render(scene, camera)
}

