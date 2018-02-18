//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;

var target, scene2, camera2, b, glows = [];

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

    target = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
    // target.wrapS = target.wrapT = THREE.RepeatWrapping;
    // target.depthBuffer = false;
    // target.stencilBuffer = false;

    let text = new THREE.TextureLoader().load('assets/image.png');

    let sphereGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 16, 16);
    let sphereMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.black, 
        specular: COLORS.black,
        shininess: 0,
        map: target.texture,
        lights: true
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

    testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    var width = window.innerWidth,
    height = window.innerHeight;

    scene2 = new THREE.Scene();
    camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    scene2.add( camera2 );
    scene2.add( new THREE.AmbientLight() );
    b = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 32), new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide}));
    // scene2.add(b);
    camera2.position.set(0, 0, 20);
    // controls = new THREE.OrbitControls(camera2, renderer.domElement)
    // controls.rotateSpeed = 2.0
    // controls.panSpeed = 0.8
    // controls.zoomSpeed = 1.5

    var numGlows = 50;
    var sa = 1;
    var l = .5;
    var r = .2;
    var g = new THREE.SphereGeometry(r, 64, 64);

    for(var i=0; i<numGlows; i++){

        var c = new THREE.Color();
        var h = .09 + Math.random()*.05;
        c.setHSL(h, sa, l);

        var m = new GlowMesh(g, c);
        m.scale.multiplyScalar(Math.random() * 5 + 1);

        var p = new THREE.Vector3(2 * Math.random() - 1, 2 * Math.random() - 1, 0).normalize();
        // var p = new THREE.Vector3(0, 0, 0);
        // var p = new THREE.Vector3((i-numGlows/2) * 2, (i-numGlows/2) * 2, 0);
        p.multiplyScalar(Math.random() * 20);
        m.position.set(p.x, p.y, p.z);

        glows.push(m);
        scene2.add(m);
    }

    let a = new THREE.AmbientLight();
    scene.add(a);

    clock.start();
    animate();

}

const update = () => {
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
    // controls.update();
}

const animate = () => {

    window.requestAnimationFrame(animate)
    update();

    //Animation should be extracted into its own function
    //but you get the point for now.

    //Render the frame
    renderer.render(scene2, camera2, target);
    renderer.render(scene, camera)

    //render texture for testing
    // renderer.render(scene2, camera2);
}
//Run the update call for the first time, registering
//it for every animation frame.
