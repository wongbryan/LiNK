var camera, scene, renderer, test;
var time = 0;
var plane;
var spotLight;

const COLORS = {
    'black': new THREE.Color(0x0b0202)
}

const WIDTH = 250;
const HEIGHT = 750;

function resize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function init() {

    var container = document.getElementById( 'container' );
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCSoftShadowMap;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setClearColor(COLORS.black);
    container.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 5, 10);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.5;

    scene = new THREE.Scene();

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

    var planeGeom = new THREE.PlaneGeometry(WIDTH, HEIGHT),
    planeMat = new THREE.MeshPhongMaterial();
    plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -Math.PI/2;
    plane.receiveShadow = true;
    scene.add(plane);

    test = new THREE.Mesh(
        new THREE.SphereGeometry( 1, 32, 32 ),
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x000000
        })
    );
    test.castShadow = true;
    test.position.set(0, 5, 0);
    spotLight.target = test;
    test.add(spotLight);
    scene.add(test);

    window.addEventListener('resize', resize);

}

function update(){

    time += .005;
    test.position.z = 50*Math.sin(time);
    

}

function animate(){

    update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);

}

init();
animate();
