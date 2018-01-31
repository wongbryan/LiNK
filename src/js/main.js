init();
animate();

var camera, scene, renderer, test;

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
    renderer.setClearColor(0xbfe7ff);//
    container.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 10);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.5;

    scene = new THREE.Scene();

    var hemisphereLight = new THREE.HemisphereLight(0xfceafc, 0x000000, .8)
    hemisphereLight.position.set(-10, 10, 0);
    scene.add(hemisphereLight);

    test = new THREE.Mesh(
        new THREE.SphereGeometry( 1, 32, 32 ),
        new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide})
    );

    scene.add(test);

    window.addEventListener('resize', resize);

}

function update(){

}

function animate(){

    update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);

}